import React, { useState } from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Button } from "../components/ui/moving-border";
import { SparklesCore } from "@/components/ui/sparkles";

const SUMARIZE_URL = "http://localhost:3000/api/summarize";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const summarizeText = (text) => {
    fetch(SUMARIZE_URL, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setSummary(data.message.content);
      });
  };

  const onLoadFile = function () {
    const typedarray = new Uint8Array(this.result);

    // Load the PDF file.
    pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
      console.log("PDF loaded");

      // Fetch the first page
      pdf.getPage(1).then((page) => {
        console.log("Page loaded");

        // Get text from the page
        page.getTextContent().then((textContent) => {
          let text = "";
          textContent.items.forEach((item) => {
            text += item.str + " ";
          });

          // Display text content
          document.getElementById("pdfContent").innerText = text;
          setIsLoading(true);
          summarizeText(text);
        });
      });
    });
  };


  const onChangeFileInput = (event) => {
    const file = event.target.files[0];
    if (file.type !== "application/pdf") {
      console.error(file.name, "is not a PDF file.");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = onLoadFile;

    fileReader.readAsArrayBuffer(file);
  };

  React.useEffect(() => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.addEventListener("change", onChangeFileInput);
    }
  }, []);

  return (
    <main className={`flex relative min-h-screen flex-col items-center py-12 px-12 w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-y-auto`}>
      <BackgroundBeams/>
      <div className="top-10 left-10 absolute flex items-center gap-4">
        <span className="relative z-10 text-sm md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">Document Summarization</span>
      </div>

      <input className="hidden" id="file-input" type="file" />

      <br/>
      <br/>

      <div className="grid sm:grid-cols-2 min-h-[300px] min-w-[1000px] bg-gray-900 border border-gray-900 rounded-lg mt-8">
        <div class="relative bg-gray-900  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 w-full">
          <div class="mx-auto max-w-md w-full h-48 overflow-y-auto">
            <div class="divide-y divide-gray-300/50">
              <h2 className="text-center mb-4 text-2xl text-white m-4">Raw text</h2>
              <div class="space-y-6 py-8 text-base leading-7 text-white" id="pdfContent"></div>
            </div>
          </div>
        </div>
        <div class="relative bg-gray-900 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 w-full">
          <div class="mx-auto max-w-md w-full h-48 overflow-y-auto">
            <div class="divide-y divide-gray-300/50">
              <h2 className="text-center mb-4 text-2xl text-white m-4">Summarized text</h2>
              {isLoading && (
                <p className="text-white text-center">Processing pdf...</p>
              )}
              {!isLoading && (
                <div className="text-white">{summary}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <br/>
      <Button
        onClick={() => {
          document.getElementById("file-input").click();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Upload PDF</span>
      </Button> 

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-5xl text-3xl sm:text-4xl font-bold text-center text-white relative z-20">
      Document Summarization App
      </h1>
      <div className="w-[40rem] h-40 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
      
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div> 
      </div> 
    </div> 
    </main>
  );
}
