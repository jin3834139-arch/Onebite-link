import { NextRequest, NextResponse } from "next/server";
import { extractOpenGraph, isPrivateHost } from "@/lib/og";

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL이 아닙니다." },
      { status: 400 }
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json(
      { error: "http/https 주소만 지원합니다." },
      { status: 400 }
    );
  }

  if (isPrivateHost(parsedUrl.hostname)) {
    return NextResponse.json(
      { error: "허용되지 않는 주소입니다." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `링크를 불러오지 못했어요. (${response.status})` },
        { status: 502 }
      );
    }

    const finalUrl = new URL(response.url || parsedUrl.toString());
    if (isPrivateHost(finalUrl.hostname)) {
      return NextResponse.json(
        { error: "허용되지 않는 주소입니다." },
        { status: 400 }
      );
    }

    const html = await response.text();
    const { title, description, thumbnail } = extractOpenGraph(html, finalUrl);

    return NextResponse.json({
      title,
      description,
      thumbnail,
      url: finalUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "링크 정보를 가져오는 중 오류가 발생했어요." },
      { status: 502 }
    );
  }
}
