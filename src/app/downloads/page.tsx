import { getDownloads } from "@/lib/api";

export const revalidate = 60;

export default async function DownloadsPage() {
  const downloadsRes = await getDownloads().catch(() => ({ data: [] }));
  const downloads = downloadsRes?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Downloads</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Access our brochures, technical datasheets, and corporate materials.
          </p>
        </div>
      </section>

      {/* Downloads List */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {downloads.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
              <ul className="divide-y divide-zinc-100">
                {downloads.map((item: any) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="w-12 h-12 bg-red-100 text-red-500 rounded-lg flex items-center justify-center mr-4 text-xl shrink-0">
                        📄
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900">{item.attributes?.Title || 'Document'}</h3>
                        <p className="text-zinc-500 text-sm">{item.attributes?.Type || 'PDF'}</p>
                      </div>
                    </div>
                    {item.attributes?.File?.data?.attributes?.url ? (
                      <a 
                        href={item.attributes.File.data.attributes.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0A3D62] hover:bg-[#1E90FF] text-white px-6 py-2 rounded-full font-medium transition-colors w-full sm:w-auto text-center"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-zinc-400 italic">File unavailable</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-zinc-100">
              <h3 className="text-2xl font-semibold text-zinc-400 mb-4">No Downloads Available</h3>
              <p className="text-zinc-500">There are currently no brochures or documents uploaded.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
