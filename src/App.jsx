import { Link } from "react-router";
function App() {

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center text-gray-950 bg-gray-200">
        <div className="flex flex-col items-center w-full max-w-[1280px] gap-5">
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span className="text-xl font-bold">Blur Teknoloji</span>
            <span className="text-lf font-semibold">
              Tam Zamanlı Full-Stack Pozisyonu
            </span>
            <span className="font-semibold">Kodlama Mülakatı</span>
          </div>

          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span>Mülakat kodlama mücadelesine hoşgeldiniz!</span>
            <span>
              Proje içerik ve gerekçelerini <code>README.md</code> dosyasında
              bulabilirsiniz.
            </span>
            <span className="font-semibold">Başarılar dileriz!</span>
          </div>
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span>
              Oluşturacağınız yeni sayfaya erişim sağlayacak öğeyi (buton, link
              vs.) buraya ekleyiniz.
            </span>
            <br />
            <Link
              to="/enterprises"
              className="px-4 py-2 bg-blue-500 text-white rounded text-center"
            >
              Şirketler Sayfasına Git
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
