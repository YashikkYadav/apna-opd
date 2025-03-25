const OurVision = () => {
    return (
        <div className="max-w-[1270px]  mx-auto ">
            <div className="mx-[15px] sm:mx-[30px] bg-[#0B5895]">

            <div className="xl:bg-[url('/images/our_vision_vector.svg')] bg-no-repeat bg-right py-[60px] md:py-[117px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] md:gap-[16px] max-w-[1024px] mx-auto px-[15px] sm:px-[30px] xl:px-0">
                    <div className="text-white">
                        <h2 className="title-48 mb-[16px] !text-white">Our Vision</h2>
                        <p className="max-w-[414px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="text-white">
                        <h2 className="title-48 mb-[16px] !text-white">Our Mission</h2>
                        <ul className="flex flex-col gap-[16px]">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default OurVision;