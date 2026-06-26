export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-10 px-6 md:px-12 border-t-4 border-yellow-500/20">
      {/* Container utama */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <h2 className="text-white text-lg font-bold mb-6 tracking-wide">
          OUR INFORMATION
        </h2>

        {/* Grid 4 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* Kolom 1: Sekretariat */}
          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: '21px' }}>
              Sekretariat
            </h3>
            <p className="leading-relaxed" style={{ fontSize: '15px' }}>
              Jl. Perumahan Mutiara Vantavin No.1,
              Pacul Kulon, Pacul, Kec. Talang, Kab.
              Tegal, Jawa Tengah 52193
            </p>
          </div>

          {/* Kolom 2: Telepon */}
          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: '21px' }}>
              Telepon
            </h3>
            <p className="flex items-center gap-1">
              WhatsApp: 
              <a 
                href="https://wa.me/6287722112002" 
                target="_blank" 
                rel="noreferrer"
                className="underline hover:text-white transition-colors"
              >
                +62 877-2211-2002
              </a>
            </p>
          </div>

          {/* Kolom 3: Follow Us */}
          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: '21px' }}>
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              
              {/* --- PASTE SVG INSTAGRAM DI SINI --- */}
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="38" height="38" fill="url(#pattern0_57_160)"/>
                        <defs>
                        <pattern id="pattern0_57_160" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_57_160" transform="scale(0.0263158)"/>
                        </pattern>
                        <image id="image0_57_160" width="38" height="38" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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"/>
                        </defs>
                    </svg>

                </div>
              </a>

              {/* --- PASTE SVG FACEBOOK DI SINI --- */}
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="38" height="38" fill="url(#pattern0_57_161)"/>
                        <defs>
                        <pattern id="pattern0_57_161" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_57_161" transform="scale(0.0263158)"/>
                        </pattern>
                        <image id="image0_57_161" width="38" height="38" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAADbklEQVR4AeyYS2xMURjHZ0ZbrRKvSCWVRitISCQeiRXCxgYLC/EIC8FKykqCjXgtLCRsxFZiYWGhVkhorCReiTTimaYqJVHPUkrN+P2qozNj7kync9vpos33y3ce3z3nf79z5t5zG4vwl0gkorAQjsCdeDzehn89CNqJeQH34G4K1h9Qfwb5xnlJzHVohAaIIikS6y8spXIJGmFJNBqtw9cOglnEzAGvX4ZPYn0x9bmQb5x6YlbCYTgD89VkxhZQuQDzYAqUw0iaGRrPhDNgFaJO4esVts0CKMggiiUx565mtRYx+1qFbaRQAaPB3FpmbrXCGlCkx4VmCUaKw+8A7DOG7nQjY1W01CrIJaQcmvUyUhvcgqtwJYMm6s3wDbKZS1qmsGydQ2lTUAsX7oEVsBl2we4M7D9G2zsItLCEfWeGG6AYHzsdLEknvIcPqRDzEb6AN4LLbmEIc4JXDH8QniCiG9xDVAMt6/5KjS5WmBN8YsDT0IIgNzvF4q1YYWamHRlNYYpivEgYwt4ykHsGl248xX0Hp0GEvzqhGGzFCnMpexg+bQn7BU2mfQucz+Acdd+LNfhAK1aYAytOLKdSySllOQ3bs7COtokQaGEICx48FhtHZ2UGvrB9BeacO2cnA5bMChXmr9CHqZtdulD+A7ItpbHuP+NS6WIPdnNN2r6knmaFCvvM1b5mkgfJ2dR38qj4hf9n1BXaScMhyDwo1tG/gfY3EGiFCnNCM/aVwZOYsf8moD8BPZCM6/MEmq0y/AQItEKFBQ5UQIdzTiK+GgLNoMDOYerwV+ry+ssMnGJEhbHpfeKbKb8zLIcmzMG800omqQJ9Bd72tElsg3Iwrg8CPJ1OxSsMF2yFZsxl8Km9jyH3g5976/HZxnFzr6HPuFQ8KIYuzDv2q+o4E56Ao7AVfMLj/hpZMoO+chRtXBKv20vUNMhp2e405wV0OmkmNAdaZmw0Ehg60DEUYQNXD2NpTFihyR3L2FAylnYyKHSAYYj3oNDrUrYyuGcnXOmNZ6Cnlw6FXUbOTxgNFueY5L8ObirsIorMmktqGqmWxJy7m4w9YvZrCntMYQc8B0+oCqQ4YqYgj+BmqpmMHWDm1hgFO+5T2QRn4SH4dd2Bz4fHY0+kNdzpzCRc5zfjdLw3mW8MV+s2sSfBw8FTNf0BAAD//z3+UhEAAAAGSURBVAMAYo+OYCWW3MYAAAAASUVORK5CYII="/>
                        </defs>
                    </svg>
                </div>
              </a>

              {/* --- PASTE SVG YOUTUBE DI SINI --- */}
              <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="60" height="60" fill="url(#pattern0_57_162)"/>
                        <defs>
                        <pattern id="pattern0_57_162" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_57_162" transform="scale(0.0166667)"/>
                        </pattern>
                        <image id="image0_57_162" width="60" height="60" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAEAElEQVR4AeyYSYwMURjHq9tgrLFvFxJrhJO4ODiIGxJCgjhYQ2I7WCKxRoglIsQWscYccEIcxEUIEiF2YktwIHGwM8xMjG6/X8WIZpiZqq5Zkul8v/6+elXvvX99/fq9V5UOGtinUXDSP1hjhus0w9lstgk0hWbQPGHso4A+/vur55zkYsW1xLeFrmRrGEyC+bAMVsDqfJHJZFbR1nJYBLNgDAyi747QGgqhCWW/LBRMYQraUzqKRrbiL8MLuAhFYNlafEUHdhKbdDpdkYANtL0bTsAteASnYAkMQVsLfGhpDlJEHWAnFNHIHPwgaAp1YSaxEx2PABO0Hz8FnaFoT7akYB1MhjbgDQhhnZoamqFgMCyEsYguUPAADsaDMa7emcO1N6pGQltFmnp/Ao7rp6VSKYdDP9R1UfBwAtOPq7emvu6o66rgvgQNwdohMhwSnQm8A1wky1KrHEohA0mZk0OhGTaI2oliv1L5GpyEJ/AevAFcXs1pNpwlclaSGnbxnevvgLPMdPxE2AY34CN4Q7i8mKMgbYZjCWZufIucD/yTy+Au8UZwTt+LfwoK98YIY5laU35J5JYQmZNFjsvhOQ26lE/DHwJv5DM+51qOa2JmOBRck0rVvhbRJVx8BVbCbDgCz/hFHPOE0SxWdqvqEtEZUKBj2s2SS+w56kUeIokKRlhoiM6CQ+Ic3iFi9sNzNf2qFcEMA3eFbqwGInAoFEIk+6fgSK39UemnUOf5PpxyytuCXwAFEMkSEYxQd1itUOSyPxrvVLcH70bLTBNGMwXHmWoCxVV0bQzuYXtRNhbcZ2/HjwNXKqcmwsiWVfC3yNWDIM2fyEz6DGbmetKWWVyJ8H3EE6AbpCCuObOEgr/EaMmx2J/6M8HVzWe0XcRTuRHHrkKFotjm/qTcDL+J0ZRielDfZ68d+Bng00Gc5Z4mKjV3g6UKdr2PM44Vbaab043t4RIx5/FiO7hJ83EEUz1xU5+brHcK9h2Ey2fivcbowD/cS+q/VvB9ggdQn83h8BiB7xX8iuA4xPnzUT0xc3bwSeYSPZQ4j1pQxCuqwxQo3mPCOjfHbRkqfG11DH+BqTJjhomDd7yiWk/g8umdPCP+BEk+VNJ8peZ4tW9nL7eiTpdHEPvBq0PBHLj98yJf+vmWchMn3Qb6Qu4CsQ+ZPrs53vPNPdq/DVfhPPgwa9+bid38H0VfKJbjIBRsIJxwn3qd+AAshqkwD5aCq5ivWtcQ5xMXHTf39jGXtl01ff16ED23IGclzhHMxQEXmG3xaaGYsofgMDmDN+NmIJ+cpt2zcJm+H8EnsH/HMMW59pfg3NPB7zcQNlLRWBI+qManSsHVaKNWL2kUnHS6G1yGfwAAAP//QDBT8gAAAAZJREFUAwB8ub1oTwaISgAAAABJRU5ErkJggg=="/>
                        </defs>
                    </svg>
                </div>
              </a>

            </div>
          </div>

          {/* Kolom 4: Copyright */}
          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: '21px' }}>
              Copyright
                </h3>
            <p className="leading-relaxed">
              ©TeamPatavin Project©PPMUHN 2026 All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;