import axios from "axios";
import { useState } from "react";

export const Resume: React.FC = () => {
  const [form, setForm] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!form) return;

    const formData = new FormData();
    formData.append("resume", form);

    try {
      const response = await axios.post("http://localhost:3000/apiv2/upload", formData);
      console.log("Upload successful:", response.data);
      setForm(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="border border-dashed rounded-md p-4">
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input type="file" onChange={handleChange} />
        <button
          type="submit"
          className="bg-gray-500 text-blue-300 border rounded-md px-4 py-1 mt-2"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};
