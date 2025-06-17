export default function PageWrapper({ children }) {
    return (
        <div className="w-full h-full flex flex-col">
            <header className="w-full h-[50px] bg-red-300"></header>

            <div className="w-full h-[85%]">
                {children}
            </div>

            <footer className="w-full h-[50px] bg-blue-300"></footer>
        </div>
    )
}