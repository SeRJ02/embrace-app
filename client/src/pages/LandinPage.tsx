import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 70;

export const LandinPage = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const threshold = el.clientHeight - NAV_HEIGHT - 60;
    const onScroll = () => {
      setOnHero(el.scrollTop < threshold);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Outer: fills full viewport; centers content on wide screens */
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      {/* Inner: responsive column — full-width on phones, capped on tablets/desktop */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "480px",
          height: "100dvh",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ── STICKY NAVBAR ── */}
        <nav
          data-testid="nav-main"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: `${NAV_HEIGHT}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "clamp(14px, 4.5vw, 22px)",
            paddingRight: "clamp(14px, 4.5vw, 22px)",
            backgroundColor: onHero ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transition: "background-color 0.35s ease",
            boxShadow: onHero ? "none" : "0 1px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            data-testid="button-menu"
            style={{ display: "flex", flexDirection: "column", gap: "7px", cursor: "pointer", width: "32px", flexShrink: 0 }}
          >
            {[32, 32, 22].map((w, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: "2.5px",
                  width: `${w}px`,
                  borderRadius: "9999px",
                  backgroundColor: onHero ? "#fff" : "#1a1a1a",
                  boxShadow: onHero ? "0 1px 3px rgba(0,0,0,0.5)" : "none",
                  transition: "background-color 0.35s ease",
                }}
              />
            ))}
          </div>

          <h1
            data-testid="text-brand-name"
            style={{
              fontFamily: "'SF Pro Display','Helvetica Neue',Arial,sans-serif",
              fontWeight: 900,
              letterSpacing: "0.07em",
              fontSize: "clamp(26px, 7vw, 34px)",
              lineHeight: 1,
              color: onHero ? "#fffcfc" : "#1a1a1a",
              whiteSpace: "nowrap",
              margin: 0,
              padding: "0 12px",
              textShadow: onHero ? "3px 2px 8px rgba(0,0,0,0.55)" : "none",
              transition: "color 0.35s ease, text-shadow 0.35s ease",
            }}
          >
            EMBRACE
          </h1>

          <button
            data-testid="button-join-now"
            onClick={() => window.open("https://app.youform.com/forms/34qnd3ui", "_blank")}
            style={{
              fontFamily: "'Abhaya Libre',Georgia,serif",
              fontWeight: 800,
              fontSize: "clamp(14px, 4vw, 17px)",
              lineHeight: "24px",
              padding: "7px clamp(10px, 3.5vw, 16px)",
              borderRadius: "16px",
              border: onHero ? "1.5px solid rgba(0,0,0,0.6)" : "1.5px solid #885924",
              backgroundColor: onHero ? "#fffcfc" : "#885924",
              color: onHero ? "#000" : "#fff",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.35s ease",
              boxShadow: onHero ? "none" : "3px 2px 8px rgba(50,52,33,0.35)",
            }}
          >
            Join Now
          </button>
        </nav>

        {/* ── PAGE 1: HERO ── */}
        <section
          data-testid="section-hero"
          style={{
            position: "relative",
            height: `calc(100dvh - ${NAV_HEIGHT}px)`,
            marginTop: `-${NAV_HEIGHT}px`,
            overflow: "hidden",
          }}
        >
          <img
            alt="Couple embracing"
            src="/figmaAssets/81f773ac56307d0a7c4926d176f88fd3-2.png"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 45%, rgba(0,0,0,0.68) 100%)",
            }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(14px, 5vw, 24px) clamp(28px, 6vh, 52px)" }}>
            <h2
              data-testid="text-tagline"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(30px, 9vw, 44px)",
                lineHeight: 1.25,
                color: "#fff",
                margin: 0,
              }}
            >
              Find who you love.
            </h2>
            <p
              style={{
                fontFamily: "'Caveat',cursive",
                fontWeight: 700,
                fontSize: "clamp(22px, 7vw, 34px)",
                lineHeight: 1.4,
                color: "#fff",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Everyday♡
            </p>
          </div>
        </section>

        {/* ── PAGE 2: OUR FORMULA ── */}
        <section
          data-testid="section-formula"
          style={{ backgroundColor: "#fff", position: "relative", overflow: "hidden" }}
        >
          {/* Top text block */}
          <div style={{ padding: "clamp(24px, 5vw, 40px) clamp(16px, 5vw, 24px) 0" }}>
            <p style={{ fontFamily: "'Abhaya Libre',Georgia,serif", fontWeight: 800, fontSize: "clamp(13px, 4vw, 17px)", margin: "0 0 10px 0", letterSpacing: "0.02em" }}>
              <span style={{ color: "#000" }}>Our </span>
              <span style={{ background: "radial-gradient(ellipse at center, #4f3812 0%, #694a18 25%, #825c1e 50%, #b58029 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Formula
              </span>
            </p>

            <h2 style={{ fontFamily: "'Abhaya Libre',Georgia,serif", fontWeight: 800, fontSize: "clamp(24px, 7.5vw, 36px)", lineHeight: 1.3, color: "#1a1a1a", margin: "0 0 16px 0" }}>
              Your match isn't found.{" "}<br />
              It's decided carefully,{" "}
              <span style={{ background: "radial-gradient(ellipse at center, #312608 0%, #47330d 25%, #5d4019 50%, #885924 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                only once a day
              </span>.
            </h2>

            <img
              src="/assets/p2-wave.svg"
              alt=""
              style={{ width: "clamp(160px, 55vw, 220px)", height: "18px", objectFit: "contain", marginBottom: "20px", display: "block" }}
            />
          </div>

          {/* Two-column: body text + portrait */}
          <div style={{ display: "flex", alignItems: "flex-start", padding: "0 clamp(10px, 3vw, 16px) 0 clamp(16px, 5vw, 24px)", gap: "clamp(8px, 3vw, 16px)", marginBottom: "28px" }}>
            <p style={{ fontFamily: "'Merriweather',Georgia,serif", fontSize: "clamp(12px, 3.2vw, 14px)", lineHeight: "1.7", color: "#846331", margin: 0, flex: "1 1 0" }}>
              We remove the scrolling, the browsing, the ranking. Each morning, one person arrives chosen thoughtfully, not algorithmically performed. You meet them as human, not a profile to be judged in three seconds.
            </p>

            <div style={{ position: "relative", flexShrink: 0, width: "clamp(120px, 38vw, 170px)" }}>
              <img
                src="/assets/p2-portrait.png"
                alt="Portrait"
                style={{ width: "100%", height: "clamp(150px, 48vw, 210px)", objectFit: "cover", borderRadius: "16px", display: "block" }}
              />
              <img
                src="/assets/p2-ellipse.svg"
                alt=""
                style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", width: "90%", height: "20px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* ── FORM PLACEHOLDER SECTION ── */}
          <div
            data-testid="section-form-placeholder"
            style={{
              margin: "12px clamp(14px, 5vw, 24px) 0",
              borderRadius: "20px",
              border: "2px dashed rgba(136,89,36,0.35)",
              backgroundColor: "rgba(136,89,36,0.04)",
              padding: "clamp(20px, 5vw, 32px) clamp(16px, 5vw, 28px)",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'Abhaya Libre',Georgia,serif", fontWeight: 700, fontSize: "clamp(11px, 3vw, 13px)", color: "#885924", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px 0", opacity: 0.7 }}>
              Registration Form — Coming Soon
            </p>
            <p style={{ fontFamily: "'Merriweather',Georgia,serif", fontSize: "clamp(11px, 3.2vw, 13px)", lineHeight: "1.6", color: "#846331", margin: "0 0 20px 0" }}>
              Your journey to meaningful connection starts here.
            </p>

            <button
              data-testid="button-join-now-form"
              onClick={() => window.open("https://app.youform.com/forms/34qnd3ui", "_blank")}
              style={{
                fontFamily: "'Abhaya Libre',Georgia,serif",
                fontWeight: 800,
                fontSize: "clamp(16px, 5vw, 22px)",
                lineHeight: "28px",
                padding: "11px 0",
                borderRadius: "14px",
                border: "none",
                backgroundColor: "#885924",
                color: "rgba(255,255,255,0.92)",
                cursor: "pointer",
                boxShadow: "5px 3px 6px rgba(50,52,33,0.45)",
                letterSpacing: "0.05em",
                display: "block",
                width: "100%",
              }}
            >
              JOIN NOW
            </button>
          </div>

          {/* Bottom banner with quote */}
          <div style={{ position: "relative", width: "100%", height: "clamp(140px, 22vw, 190px)", marginTop: "32px" }}>
            <img
              src="/assets/p2-banner.png"
              alt="Banner"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
            <p
              data-testid="text-quote"
              style={{
                fontFamily: "'Archivo Black',sans-serif",
                fontSize: "clamp(14px, 4.2vw, 19px)",
                lineHeight: "1.55",
                color: "#fff2dd",
                position: "absolute",
                left: "clamp(16px, 5vw, 28px)",
                right: "clamp(16px, 5vw, 28px)",
                top: "clamp(16px, 4vw, 28px)",
                margin: 0,
              }}
            >
              "The right person was never lost in the crowd.{" "}<br />
              You just stopped looking."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
