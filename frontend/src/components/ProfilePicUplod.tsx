'use client'
import React, { useRef, useState } from 'react'

interface Props {
    onChnage: (file:File) => void;
    onRemove: () => void;
  }

const ProfilePicUplod = ({ onChnage, onRemove }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        onChnage(selected)
        setPreview(URL.createObjectURL(selected));
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        inputRef.current!.value = '';
        onRemove();
      };
  return (
      <div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
              <div className="mt-2 flex items-center gap-4">
                  <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                  <button className="text-orange-500 text-sm underline" onClick={handleRemove}>Remove</button>
              </div>
          )}
          <input type="hidden" id="uploadToS3" value={file ? 'true' : ''} />
      </div>
  )
}

export default ProfilePicUplod