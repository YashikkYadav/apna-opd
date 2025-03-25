const BannerWithTitle = ({ title, description }) => {
    return (
        <div className="bg-[#0D7EB7] banner-with-search">
            <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right ">

                <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[570px]">
                    <div className="flex justify-between items-end pt-[60px] pb-[60px] md:pt-[189px] md:pb-0">
                        <div className="max-w-[600px]">
                            <h1 className="title-64 mb-[32px] max-w-[530px]">{title}</h1>
                            <p className="text-base text-white">{description}</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default BannerWithTitle;