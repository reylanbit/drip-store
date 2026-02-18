import Layout from "../../Layouts/Layout";

const ComponentsPage = () => {
  return (
    <Layout>
      <main className="bg-neutral-lightGray3">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[32px] min-[1025px]:py-[48px]">
          <h1 className="text-[24px] min-[641px]:text-[28px] font-bold text-neutral-darkGray2 mb-[24px]">
            Componentes
          </h1>
          <div className="grid gap-[24px] min-[900px]:grid-cols-2 min-[1200px]:grid-cols-3">
            <div className="border-2 border-dashed border-[#C9C9FF] rounded-[12px] p-[20px] bg-white">
              <div className="flex flex-col gap-[14px]">
                <button className="h-[44px] rounded-[10px] bg-[#C92071] text-white font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#A61A5E] text-white font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#D9D9D9] text-white font-bold text-[16px]">
                  Button
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-[#C9C9FF] rounded-[12px] p-[20px] bg-white">
              <div className="flex flex-col gap-[14px]">
                <button className="h-[44px] rounded-[10px] bg-[#F4F4F4] text-[#C92071] font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#B7B7F6] text-white font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] border border-[#C92071] text-[#C92071] font-bold text-[16px]">
                  Button
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-[#C9C9FF] rounded-[12px] p-[20px] bg-white">
              <div className="flex flex-col gap-[14px]">
                <button className="h-[44px] rounded-[10px] bg-[#C92071] text-white font-bold text-[16px] flex items-center justify-center gap-[8px]">
                  <span className="text-[18px] leading-none">+</span>
                  Add New
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#A61A5E] text-white font-bold text-[16px] flex items-center justify-center gap-[8px]">
                  <span className="text-[18px] leading-none">+</span>
                  Add New
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#D9D9D9] text-white font-bold text-[16px] flex items-center justify-center gap-[8px]">
                  <span className="text-[18px] leading-none">+</span>
                  Add New
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-[#C9C9FF] rounded-[12px] p-[20px] bg-white">
              <div className="flex flex-col gap-[14px]">
                <button className="h-[44px] rounded-[10px] bg-[#F6AA1C] text-white font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#D98A00] text-white font-bold text-[16px]">
                  Button
                </button>
                <button className="h-[44px] rounded-[10px] bg-[#D9D9D9] text-white font-bold text-[16px]">
                  Button
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-[#C9C9FF] rounded-[12px] p-[20px] bg-white flex items-center justify-center gap-[16px]">
              <div className="flex flex-col items-center gap-[10px]">
                <div className="w-[28px] h-[28px] border border-[#C9C9FF] rounded-[4px]" />
                <div className="w-[28px] h-[28px] bg-[#C92071] rounded-[4px] flex items-center justify-center text-white text-[18px]">
                  ✓
                </div>
              </div>
              <div className="flex flex-col items-center gap-[10px]">
                <div className="w-[28px] h-[28px] border border-[#C9C9FF] rounded-full" />
                <div className="w-[28px] h-[28px] border-2 border-[#C92071] rounded-full flex items-center justify-center">
                  <span className="w-[12px] h-[12px] bg-[#C92071] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <h2 className="text-[22px] min-[641px]:text-[26px] font-bold text-neutral-darkGray2 mb-[20px]">
              Typography
            </h2>
            <div className="grid gap-[24px] min-[900px]:grid-cols-2">
              <div className="bg-white rounded-[16px] p-[24px]">
                <h3 className="text-[16px] font-bold text-neutral-darkGray2 mb-[16px]">
                  Desktop Typography
                </h3>
                <div className="flex flex-col gap-[16px]">
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE LARGE · H1</span>
                    <h4 className="text-[32px] font-bold text-neutral-darkGray2 leading-[1.2] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h4>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE MEDIUM · H2</span>
                    <h5 className="text-[24px] font-bold text-neutral-darkGray2 leading-[1.3] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h5>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE SMALL · H3</span>
                    <h6 className="text-[18px] font-bold text-neutral-darkGray2 leading-[1.4] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h6>
                  </div>
                </div>

                <div className="mt-[24px] border-t border-neutral-lightGray2 pt-[20px]">
                  <h4 className="text-[16px] font-bold text-neutral-darkGray2 mb-[12px]">Text</h4>
                  <div className="grid gap-[12px]">
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT LARGE</span>
                      <p className="text-[16px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT MEDIUM</span>
                      <p className="text-[14px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT SMALL</span>
                      <p className="text-[12px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-[24px] border-t border-neutral-lightGray2 pt-[20px]">
                  <h4 className="text-[16px] font-bold text-neutral-darkGray2 mb-[12px]">Text Bold</h4>
                  <div className="grid gap-[12px]">
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT LARGE BOLD</span>
                      <p className="text-[16px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT MEDIUM BOLD</span>
                      <p className="text-[14px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT SMALL BOLD</span>
                      <p className="text-[12px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-[24px]">
                <h3 className="text-[16px] font-bold text-neutral-darkGray2 mb-[16px]">
                  Mobile Typography
                </h3>
                <div className="flex flex-col gap-[16px]">
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE LARGE · H1</span>
                    <h4 className="text-[24px] font-bold text-neutral-darkGray2 leading-[1.25] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h4>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE MEDIUM · H2</span>
                    <h5 className="text-[20px] font-bold text-neutral-darkGray2 leading-[1.3] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h5>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C92071]">TITLE SMALL · H3</span>
                    <h6 className="text-[16px] font-bold text-neutral-darkGray2 leading-[1.4] mt-[6px]">
                      Lorem ipsum dolor sit amet, consectetur.
                    </h6>
                  </div>
                </div>

                <div className="mt-[24px] border-t border-neutral-lightGray2 pt-[20px]">
                  <h4 className="text-[16px] font-bold text-neutral-darkGray2 mb-[12px]">Text</h4>
                  <div className="grid gap-[12px]">
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT LARGE</span>
                      <p className="text-[14px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT MEDIUM</span>
                      <p className="text-[13px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT SMALL</span>
                      <p className="text-[12px] text-neutral-darkGray3 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-[24px] border-t border-neutral-lightGray2 pt-[20px]">
                  <h4 className="text-[16px] font-bold text-neutral-darkGray2 mb-[12px]">Text Bold</h4>
                  <div className="grid gap-[12px]">
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT LARGE BOLD</span>
                      <p className="text-[14px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT MEDIUM BOLD</span>
                      <p className="text-[13px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C92071]">TEXT SMALL BOLD</span>
                      <p className="text-[12px] font-bold text-neutral-darkGray2 mt-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ComponentsPage;
