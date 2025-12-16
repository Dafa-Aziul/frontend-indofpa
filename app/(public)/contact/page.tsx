import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* Background gradient */}
      <div className="w-full py-20 text-center">

        <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
        <p className="text-gray-700 text-lg">
          Jika ada pertanyaan atau komentar, hubungi kami melalui informasi berikut.
        </p>

        {/* Contact Cards */}
        <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* EMAIL */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="bg-green-600 text-white p-4 rounded-full mb-6">
                <Mail size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-700">support@indofpa.org</p>
            </CardContent>
          </Card>

          {/* LOKASI */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="bg-green-600 text-white p-4 rounded-full mb-6">
                <MapPin size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2">Lokasi</h3>
              <p className="text-gray-700">
                Jl. Limau Manis, Kec. Pauh,<br />
                Kota Padang, Sumatera Barat
              </p>
            </CardContent>
          </Card>
 
          {/* TELEPON */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="bg-green-600 text-white p-4 rounded-full mb-6">
                <Phone size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2">No. Telp</h3>
              <p className="text-gray-700">+62 812-9476-5310</p>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}
