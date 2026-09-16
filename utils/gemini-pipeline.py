#!/usr/bin/env python3
"""
gemini-pipeline.py — Native Gemini implementation for Website Pitch Pipeline
Eliminates Firecrawl, Apify, and external scrapers using native Gemini tools:
- google_maps: Local business discovery & location verification
- google_search: Real-time search grounding
- url_context: Direct webpage retrieval and content parsing
- code_execution: In-sandbox data processing and CSV generation
"""

import sys
import os
import argparse
import json
import subprocess
import shutil

def get_gemini_client():
    """Initializes and returns the Google GenAI client."""
    try:
        from google import genai
    except ImportError:
        print("❌ 'google-genai' SDK is not installed. Install with: pip install google-genai", file=sys.stderr)
        sys.exit(1)
        
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("⚠️ GEMINI_API_KEY environment variable is not set. Gemini API calls will require authentication.", file=sys.stderr)
    
    return genai.Client(api_key=api_key)

def take_native_screenshot(url: str, output_path: str) -> bool:
    """Takes a full-page screenshot using the local Google Chrome binary without Puppeteer/Playwright."""
    chrome_candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        shutil.which("google-chrome"),
        shutil.which("google-chrome-stable"),
        shutil.which("chromium"),
        shutil.which("chromium-browser")
    ]
    chrome_bin = next((c for c in chrome_candidates if c and os.path.exists(c)), None)
    if not chrome_bin:
        print(f"⚠️ No Chrome/Chromium binary found. Skipping screenshot for {url}", file=sys.stderr)
        return False
        
    cmd = [
        chrome_bin,
        "--headless=new",
        "--disable-gpu",
        f"--screenshot={output_path}",
        "--window-size=1280,800",
        url
    ]
    try:
        res = subprocess.run(cmd, capture_output=True, timeout=15)
        return os.path.exists(output_path) and os.path.getsize(output_path) > 0
    except Exception as e:
        print(f"⚠️ Screenshot failed: {e}", file=sys.stderr)
        return False

def run_research(geo: str, vertical: str, count: int = 5, out_csv: str = None):
    """Loop 1: Research local businesses with weak websites using native Gemini tools."""
    client = get_gemini_client()
    
    prompt = f"""
    You are an expert agency market researcher running Loop 1 of the website-pitch-pipeline.
    Geography: {geo}
    Vertical: {vertical}
    Target Count: {count} qualified businesses with weak or missing websites.

    Use Google Maps and Google Search to find real local businesses in {geo} matching the vertical '{vertical}'.
    For each business found:
    1. Inspect their official website using url_context (if they have one).
    2. Assess weak website signals (must meet at least 2):
       - No website found
       - No HTTPS / broken domain
       - Outdated copyright year (<= 2019)
       - Missing clear CTA, service list, hours, or phone
       - Abandoned template or broken mobile layout
    3. Extract their contact details: Business Name, Address/City, Phone, Public Email, Website URL, and Maps URL.
    4. Provide the result as a clean CSV table with these columns:
       Business Name,City,Category,Phone,Public Email,Website URL,Website Status,Why Outdated,Strengths,Weaknesses,Maps URL,Fit Score (1-10)
    """

    print(f"🔍 Running Gemini native research for '{vertical}' in '{geo}'...")
    try:
        interaction = client.interactions.create(
            model="gemini-3.8-flash",
            input=prompt,
            tools=[
                {"type": "google_maps"},
                {"type": "google_search"},
                {"type": "url_context"},
                {"type": "code_execution"}
            ]
        )
        
        output_text = ""
        for step in interaction.steps:
            if step.type == "model_output":
                for content_block in step.content:
                    if content_block.type == "text":
                        output_text += content_block.text + "\n"
        
        print(output_text)
        
        if out_csv:
            os.makedirs(os.path.dirname(os.path.abspath(out_csv)), exist_ok=True)
            with open(out_csv, "w", encoding="utf-8") as f:
                f.write(output_text)
            print(f"✅ Saved research output to {out_csv}")
            
    except Exception as e:
        print(f"❌ Gemini research failed: {e}", file=sys.stderr)
        sys.exit(1)

def run_audit(url: str, output_image: str = "audit_screenshot.png"):
    """Loop 2: Inspect a specific website using url_context and native Chrome screenshot."""
    print(f"🔎 Auditing target: {url}")
    screenshot_taken = take_native_screenshot(url, output_image)
    if screenshot_taken:
        print(f"📸 Captured native screenshot: {output_image}")
        
    client = get_gemini_client()
    prompt = f"""
    Perform a comprehensive weak-website audit for pitch preparation:
    Target URL: {url}

    1. Use url_context to read the webpage live.
    2. Check:
       - Copyright year
       - HTTPS & security headers
       - Mobile responsiveness indicators
       - Clear value proposition / headline
       - Contact methods (phone, email, forms)
       - Obvious layout or design flaws
    3. Extract brand assets:
       - Logo image URL
       - Favicon URL
       - Primary brand colors (if observable in CSS/HTML)
    4. Provide 3 specific, constructive pitch angles for an improved demo site.
    """
    
    try:
        interaction = client.interactions.create(
            model="gemini-3.8-flash",
            input=prompt,
            tools=[{"type": "url_context"}]
        )
        for step in interaction.steps:
            if step.type == "model_output":
                for content_block in step.content:
                    if content_block.type == "text":
                        print(content_block.text)
    except Exception as e:
        print(f"❌ Gemini audit failed: {e}", file=sys.stderr)
        sys.exit(1)

def run_self_check():
    """Self-check validation test (ponytail: zero-dependency verification check)."""
    print("=== Gemini Native Pipeline Self-Check ===")
    
    # 1. Check Python version
    py_ver = sys.version.split()[0]
    print(f"✅ Python: {py_ver}")
    
    # 2. Check Chrome screenshot availability
    chrome_candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        shutil.which("google-chrome"),
        shutil.which("chromium")
    ]
    found_chrome = any(c and os.path.exists(c) for c in chrome_candidates)
    if found_chrome:
        print("✅ Native Chrome found (headless screenshot ready)")
    else:
        print("⚠️ Chrome binary not found in standard paths (screenshots will be skipped)")
        
    # 3. Check google-genai package
    try:
        import google.genai
        print("✅ google-genai SDK installed")
    except ImportError:
        print("⚠️ google-genai SDK not installed ('pip install google-genai')")
        
    # 4. Check API key
    has_key = bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"))
    if has_key:
        print("✅ GEMINI_API_KEY present")
    else:
        print("ℹ️ GEMINI_API_KEY not set in current shell")
        
    print("=== Self-check complete ===")

def main():
    parser = argparse.ArgumentParser(description="Gemini Native Website Pitch Pipeline")
    subparsers = parser.add_subparsers(dest="command")
    
    # research subcommand
    p_res = subparsers.add_parser("research", help="Run Loop 1 research via Gemini Maps & URL Context")
    p_res.add_argument("--geo", required=True, help="Target geography (e.g. 'Austin, TX')")
    p_res.add_argument("--vertical", required=True, help="Target business vertical (e.g. 'plumbing')")
    p_res.add_argument("--count", type=int, default=5, help="Number of leads to retrieve")
    p_res.add_argument("--out", help="Output file path (e.g. leads/batch-1.csv)")
    
    # audit subcommand
    p_aud = subparsers.add_parser("audit", help="Audit a target site via url_context and native screenshot")
    p_aud.add_argument("--url", required=True, help="Target website URL")
    p_aud.add_argument("--screenshot", default="screenshot.png", help="Path to save screenshot")
    
    # self-check subcommand
    subparsers.add_parser("self-check", help="Verify local environment and tools")

    args = parser.parse_args()
    if args.command == "research":
        run_research(args.geo, args.vertical, args.count, args.out)
    elif args.command == "audit":
        run_audit(args.url, args.screenshot)
    elif args.command == "self-check":
        run_self_check()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
