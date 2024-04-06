import {createContext, useContext} from 'react'


export const PdfContext = createContext({
    pdfs: [
        {
            id: 1,
            pdf: "pdf text",
            completed : false
        }
    ],
    addPdf : (todo) => {},
    updatePdf : (id, todo) => {},
    deletePdf: (id) => {}
})

export const usePdf = () => {
    return useContext(PdfContext)
}
export const Pdfprovider = PdfContext.Provider