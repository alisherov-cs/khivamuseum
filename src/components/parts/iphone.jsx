
export default function Iphone({ image, className = '' }) {
    return <div className={`border-[3.8px] border-[#73675d] flex items-center justify-center border-solid w-[240px] aspect-[18/38] !rounded-[38px] relative ${className}`}>
        <div className="border-[3px] shadow-[0_0_0.8px_2px] shadow-[#e3cebc] border-[#191919] bg-[#191919] border-solid w-full h-full z-10 !rounded-[36px]">
            <div className="border-[2.5px] border-[#000] border-solid w-full h-full z-10 rounded-[33px] relative overflow-hidden">
                <div className="absolute top-[1.5%] w-full flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="403.2556 77.6 27.6 8.4"
                        width="30%"
                    >
                        <defs>
                            <filter
                                id="filter5343"
                                x="-0.19227619"
                                width="1.3845524"
                                y="-0.082464501"
                                height="1.164929"
                                colorInterpolationFilters="sRGB"
                            >
                                <feGaussianBlur stdDeviation="0.030983682" />
                            </filter>
                            <filter
                                id="filter5347"
                                x="-0.10877967"
                                width="1.2175593"
                                y="-0.082313926"
                                height="1.1646279"
                                colorInterpolationFilters="sRGB"
                            >
                                <feGaussianBlur stdDeviation="0.030983682" />
                            </filter>
                        </defs>
                        <g transform="translate(169.846875, 71.820983)">
                            <rect
                                width="27.51193"
                                height="8.0999603"
                                x="233.40866"
                                y="5.938086"
                                ry="4.0499802"
                                fill="#000000"
                            />
                                <g transform="matrix(1.7055481,0,0,1.7055481,159.18391,-13.506151)">
                                    <circle cx="57.21339" cy="13.775171" r="1.3121531" fill="#0a0a0a" />
                                    <circle cx="57.21339" cy="13.775171" r="0.8093546" fill="#0c0e11" />
                                    <circle cx="57.21339" cy="13.775171" r="0.61666459" fill="#12171e" />
                                    <path
                                        d="m -47.128431,5.4302366 c -0.09735,0.010246 -0.235679,0.1588277 -0.245928,0.4508659 -0.01024,0.292038 0.117842,0.4508656 0.189571,0.4508656 0.07173,0 0.368889,-0.4252483 0.05635,-0.9017315 z"
                                        transform="matrix(0.75118992,0,0,0.75118992,92.191291,9.2834671)"
                                        fill="#425a72"
                                        fillOpacity="0.299338"
                                        filter="url(#filter5343)"
                                    />
                                    <path
                                        d="m -46.429328,5.3279691 c -0.153553,0.047247 -0.183083,0.2952938 -0.177178,0.4370348 0.0059,0.1417412 0.206706,0.5138116 0.448847,0.4311293 0.242142,-0.082682 0.283483,-0.3897882 0.183084,-0.5964939 -0.100401,-0.2067057 -0.283483,-0.3543525 -0.454753,-0.2716702 z"
                                        transform="matrix(0.75118992,0,0,0.75118992,92.191291,9.2834671)"
                                        fill="#425a72"
                                        fillOpacity="0.299338"
                                        filter="url(#filter5347)"
                                    />
                                </g>
                            </g>
                    </svg>
                </div>
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt="instagram"
                />
            </div>
        </div>
  </div>
}
