const Header = ({ name, city }) => (
    <header className="bg-red-600 text-white py-3 px-6 flex justify-between items-center">
        <h1 className="font-bold text-lg">Apna OPD</h1>
        <button className="bg-white-400 text-white border border-red-500 px-4 py-1 rounded-full text-sm font-semibold animate-bounce hover:bg-white hover:text-red-600 transition duration-300">
            🚨 Emergency
        </button> </header>
);
export default Header;
