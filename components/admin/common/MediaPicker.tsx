"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { adminAxios } from "@/lib/http/adminAxios";
import toast from "react-hot-toast";

type MediaItem = {
  public_id: string;
  secure_url: string;
};

type Props = {
  onSelect: (url: string) => void;
  onClose: () => void;
};

export default function MediaPicker({ onSelect, onClose }: Props) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const [folder, setFolder] = useState("");
  const [folders, setFolders] = useState<string[]>([]);

  /* ================= FETCH FOLDERS ================= */
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await adminAxios.get("/cloudinary/folders");
        const data = res.data?.data || [];

        setFolders(data);
        if (data.length > 0) setFolder(data[0]);
      } catch {
        toast.error("Failed to load folders");
      }
    };

    fetchFolders();
  }, []);

  /* ================= FETCH MEDIA ================= */
  const fetchMedia = async (nextCursor?: string) => {
    try {
      const res = await adminAxios.get("/cloudinary/media", {
        params: {
          folder,
          cursor: nextCursor,
        },
      });

      const result = res.data?.data || {};

      if (nextCursor) {
        setMedia((prev) => [
          ...prev,
          ...(result.resources || []),
        ]);
      } else {
        setMedia(result.resources || []);
      }

      setCursor(result.next_cursor || null);
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD MEDIA ================= */
  useEffect(() => {
    if (!folder) return;

    setLoading(true);
    setMedia([]);
    setCursor(null);

    fetchMedia();
  }, [folder]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">

      {/* ================= MODAL ================= */}
      <div className="w-[90%] max-w-6xl h-[85vh] bg-[#0f0f0f] rounded-xl shadow-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            Select Image
          </h2>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR (Folders) */}
          <div className="w-56 border-r border-white/10 p-3 overflow-y-auto">
            <h3 className="text-xs text-white/50 mb-2">Folders</h3>

            {folders.map((f) => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={`block w-full text-left px-2 py-1 rounded text-sm mb-1 ${
                  folder === f
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "hover:bg-white/10"
                }`}
              >
                📁 {f.split("/").pop()}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="flex-1 p-4 overflow-y-auto">

            {loading ? (
              <p className="text-white/50">Loading...</p>
            ) : media.length === 0 ? (
              <p className="text-white/50">No images</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                {media.map((item) => (
                  <div
                    key={item.public_id}
                    className="relative h-32 rounded overflow-hidden cursor-pointer group border border-white/10 hover:border-emerald-400"
                    onClick={() => {
                      onSelect(item.secure_url);
                      onClose();
                    }}
                  >
                    <Image
                      src={item.secure_url}
                      alt=""
                      fill
                      className="object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white transition">
                      Select
                    </div>
                  </div>
                ))}

              </div>
            )}

            {/* LOAD MORE */}
            {cursor && !loading && (
              <button
                onClick={() => fetchMedia(cursor)}
                className="mt-4 px-4 py-2 bg-emerald-500 text-black rounded"
              >
                Load More
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}