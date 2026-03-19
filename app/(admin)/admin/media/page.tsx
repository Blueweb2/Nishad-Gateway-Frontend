"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { adminAxios } from "@/lib/http/adminAxios";
import { Folder, FolderOpen, ChevronRight } from "lucide-react";

/* ================= TYPES ================= */
type MediaItem = {
  public_id: string;
  secure_url: string;
};

type FolderNode = {
  name: string;
  path: string;
  children: FolderNode[];
};

/* ================= BUILD TREE ================= */
const buildFolderTree = (paths: string[]): FolderNode[] => {
  const root: any = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part: string, i: number) => {
      if (!current[part]) {
        current[part] = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          children: {},
        };
      }
      current = current[part].children;
    });
  });

  const convert = (node: any): FolderNode[] =>
    Object.values(node).map((n: any) => ({
      name: n.name,
      path: n.path,
      children: convert(n.children),
    }));

  return convert(root);
};

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const [folder, setFolder] = useState<string>("");
  const [folderTree, setFolderTree] = useState<FolderNode[]>([]);

  /* ================= FORMAT ================= */
  const formatFolder = (f: string) =>
    f.split("/").pop()?.replace(/-/g, " ") || f;

  /* ================= FETCH MEDIA ================= */
  const fetchMedia = useCallback(
    async (nextCursor?: string) => {
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
    },
    [folder]
  );

  /* ================= FETCH FOLDERS ================= */
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await adminAxios.get("/cloudinary/folders");
        const data = res.data?.data || [];

        const tree = buildFolderTree(data);
        setFolderTree(tree);

        if (data.length > 0) {
          setFolder(data[0]);
        }
      } catch {
        toast.error("Failed to load folders");
      }
    };

    fetchFolders();
  }, []);

  /* ================= FETCH MEDIA ON FOLDER CHANGE ================= */
  useEffect(() => {
    if (!folder) return;

    setLoading(true);
    setMedia([]);
    setCursor(null);

    fetchMedia();
  }, [folder, fetchMedia]);

  /* ================= DELETE ================= */
  const handleDelete = async (publicId: string) => {
    if (!confirm("Delete this image permanently?")) return;

    try {
      await adminAxios.post("/cloudinary/delete", {
        publicId,
      });

      setMedia((prev) =>
        prev.filter((m) => m.public_id !== publicId)
      );

      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= TREE COMPONENT ================= */


const FolderTree = ({
  nodes,
  level = 0,
}: {
  nodes: FolderNode[];
  level?: number;
}) => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) =>
      prev.includes(path)
        ? prev.filter((p) => p !== path)
        : [...prev, path]
    );
  };

  const isOpen = (path: string) => openFolders.includes(path);

  return (
    <div className="space-y-1 text-sm">
      {nodes.map((node) => {
        const open = isOpen(node.path);
        const isActive = folder === node.path;

        return (
          <div key={node.path}>
            {/* ================= FOLDER ITEM ================= */}
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition group ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "hover:bg-white/10"
              }`}
              style={{ paddingLeft: level * 14 }}
            >
              {/* Chevron */}
              {node.children.length > 0 ? (
                <ChevronRight
                  size={14}
                  className={`transition-transform ${
                    open ? "rotate-90" : ""
                  }`}
                  onClick={() => toggleFolder(node.path)}
                />
              ) : (
                <span className="w-[14px]" />
              )}

              {/* Icon */}
              <span
                onClick={() => {
                  setFolder(node.path);
                  if (node.children.length > 0) {
                    toggleFolder(node.path);
                  }
                }}
                className="flex items-center gap-2 w-full"
              >
                {open ? (
                  <FolderOpen size={16} />
                ) : (
                  <Folder size={16} />
                )}

                <span className="truncate">
                  {formatFolder(node.name)}
                </span>
              </span>
            </div>

            {/* ================= CHILDREN ================= */}
            {open && node.children.length > 0 && (
              <div className="ml-1 border-l border-white/10">
                <FolderTree
                  nodes={node.children}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

  return (
    <div className="flex gap-6 p-6 text-white">
      {/* ================= SIDEBAR ================= */}
      <div className="w-64 border-r border-white/10 pr-4">
        <h2 className="text-sm font-semibold mb-3 text-white/70">
          Folders
        </h2>

        {folderTree.length === 0 ? (
          <p className="text-white/50 text-sm">
            No folders found
          </p>
        ) : (
          <FolderTree nodes={folderTree} />
        )}
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2">
          Media Library
        </h1>

        {folder && (
          <p className="text-sm text-white/50 mb-6">
            Folder: {formatFolder(folder)}
          </p>
        )}

        {/* ================= GRID ================= */}
        {loading ? (
          <p className="animate-pulse text-white/60">
            Loading media...
          </p>
        ) : media.length === 0 ? (
          <p className="text-white/60">No media found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item.public_id}
                className="relative h-40 rounded overflow-hidden group border border-white/10"
              >
                <Image
                  src={item.secure_url}
                  alt=""
                  fill
                  className="object-cover"
                />

                {/* HOVER */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        item.secure_url
                      );
                      toast.success("URL copied");
                    }}
                    className="text-xs bg-white/20 px-2 py-1 rounded"
                  >
                    Copy URL
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.public_id)
                    }
                    className="text-xs bg-red-500/70 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= LOAD MORE ================= */}
        {cursor && !loading && (
          <button
            onClick={() => fetchMedia(cursor)}
            className="mt-6 px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}