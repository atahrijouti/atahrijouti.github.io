import { useEffect } from "react"
import { runOldJSCode } from "../scripts/script"

export default function Home() {
  useEffect(() => {
    runOldJSCode()
  })
  return (
    <div className="App">
      <div id="base" className="base">
        <div className="Node Node--full" id="1">
          <div className="Node--inner">
            <div className="Node Node--even-level Node--full Node--left" id="1-2">
              <div className="Node--inner">
                <div className="Node Node--full Node--left" id="1-2-2">
                  <div className="Node--inner">
                    <div className="Node Node--even-level Node--full Node--left" id="1-2-2-2">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-2-2-2-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-2-2-2-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                    <div className="Node Node--even-level Node--full Node--right" id="1-2-2-1">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-2-2-1-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-2-2-1-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Node Node--full Node--right" id="1-2-1">
                  <div className="Node--inner">
                    <div className="Node Node--even-level Node--full Node--left" id="1-2-1-2">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-2-1-2-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-2-1-2-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                    <div className="Node Node--even-level Node--full Node--right" id="1-2-1-1">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-2-1-1-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-2-1-1-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Node Node--even-level Node--full Node--right" id="1-1">
              <div className="Node--inner">
                <div className="Node Node--full Node--right" id="1-1-1">
                  <div className="Node--inner">
                    <div className="Node Node--even-level Node--full Node--right" id="1-1-1-1">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-1-1-1-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-1-1-1-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                    <div className="Node Node--even-level Node--full Node--left" id="1-1-1-2">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-1-1-2-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-1-1-2-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Node Node--full Node--left" id="1-1-2">
                  <div className="Node--inner">
                    <div className="Node Node--even-level Node--full Node--left" id="1-1-2-2">
                      <div className="Node--inner">
                        <div className="Node Node--right" id="1-1-2-2-1">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--left" id="1-1-2-2-2">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                    <div className="Node Node--even-level Node--full Node--right" id="1-1-2-1">
                      <div className="Node--inner">
                        <div className="Node Node--left" id="1-1-2-1-2">
                          <div className="Node--inner"></div>
                        </div>
                        <div className="Node Node--right" id="1-1-2-1-1">
                          <div className="Node--inner"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
