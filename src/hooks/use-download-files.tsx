const useDownloadFiles = () => {
  const downloadBlob = (
    blob: Blob | null,
    fileName: string,
    withExtension = false
  ) => {
    if (!blob) {
      console.error("Invalid Blob provided for download.");
      return;
    }

    // Mapeo de tipos MIME a extensiones de archivo
    const mimeToExtensionMap: Record<string, string> = {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        ".xlsx",
      "application/pdf": ".pdf",
      "application/zip": ".zip",
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "text/plain": ".txt",
      // Agrega más tipos MIME y extensiones si es necesario
    };

    try {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Si no se proporciona una extensión explícita, buscamos la correcta para el tipo MIME
      const extension = mimeToExtensionMap[blob.type] || ".dat"; // Usa .dat como fallback
      a.download = withExtension ? fileName : `${fileName}${extension}`;

      // Simula el click para descargar
      document.body.appendChild(a);
      a.click();

      // Limpiar después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error during the file download:", error);
    }
  };

  return {
    downloadBlob,
  };
};

export default useDownloadFiles;
