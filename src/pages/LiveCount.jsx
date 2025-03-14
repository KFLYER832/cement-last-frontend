import { useEffect, useState, Fragment, useRef } from "react";
import { Add } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../server.js";


// Data for accomplishments
const accomplishmentsData = [
    { count: 57, title: "Project" },
    { count: 499, title: "Project Managers" },
    { count: 899, title: "Development Tools" },
    { count: 654, title: "Innovative Products" }
];





const LiveCount = () => {
    const [sectionFour, setSectionFour] = useState([]);

    const [counts, setCounts] = useState({
        projectCount: 0,
        managerCount: 0,
        toolsCount: 0,
        productCount: 0
    });

    const sectionRef = useRef(null); // Reference to the section



    const fetchSectionFours = async () => {
        try {
            const response = await axios.get(`${server}/section-four/public/get-all-section-four`);
            setSectionFour(response.data.SectionFours || []); // Ensure it's always an array
        } catch (error) {
            console.error("Error fetching sectionFour:", error);
            toast.error("Failed to fetch sectionFour.");
            setSectionFour([]); // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchSectionFours();
    }, []);



    // Function to trigger the count-up animation with easing
    const animateCount = (targetValue, key) => {
        const duration = 3000; // Duration of the count-up
        const startValue = 0; // Start value of the count
        const startTime = performance.now(); // Start time of the animation

        const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // Ease in/out function

        const updateCount = (timestamp) => {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOut(progress); // Apply easing
            const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));

            setCounts((prevCounts) => ({
                ...prevCounts,
                [key]: currentValue
            }));

            if (progress < 1) {
                requestAnimationFrame(updateCount); // Continue animation until progress is 100%
            }

        };

        requestAnimationFrame(updateCount);
    };

    // Use IntersectionObserver to trigger the count-up when the section is in view
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (isInView) {
                    accomplishmentsData.forEach((item, index) => {
                        const keys = ["projectCount", "managerCount", "toolsCount", "productCount"];
                        animateCount(item.count, keys[index]);
                    });
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    return (
        <Fragment>
            <section className="live-Data" ref={sectionRef}>
                <div>
                    <div>
                        <h2>{sectionFour.length > 0 ? sectionFour[0].hOne : "Loading..."}</h2>
                        <h1>{sectionFour.length > 0 ? sectionFour[0].hTwo : "Loading..."}</h1>
                    </div>

                    <section>
                        {accomplishmentsData.map((item, index) => (
                            <div key={index}>
                                <span className="animate">{counts[Object.keys(counts)[index]]}</span>
                                <span><Add /></span>
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </section>

                </div>
            </section>



            {/* section section */}
            <section className="bulk-data">
                <div>
                    {sectionFour.map((item, index) => (
                        <div key={index}>
                            <h2>{item.hThree}</h2>
                            <div>
                                <p>{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

export default LiveCount;





// const LiveCount = () => {
//     const [projectCount, setProjectCount] = useState(0);
//     const [managerCount, setManagerCount] = useState(0);
//     const [toolsCount, setToolsCount] = useState(0);
//     const [productCount, setProductCount] = useState(0);
//     const sectionRef = useRef(null); // Reference to the section

//     // Function to trigger the count-up animation with easing
//     const animateCount = (targetValue, setter) => {
//         const duration = 3000; // Duration of the count-up
//         const startValue = 0; // Start value of the count
//         const startTime = performance.now(); // Start time of the animation

//         const easeInOut = (t) => {
//             return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Ease in/out function
//         };

//         const updateCount = (timestamp) => {
//             const elapsedTime = timestamp - startTime;
//             const progress = Math.min(elapsedTime / duration, 1);
//             const easedProgress = easeInOut(progress); // Apply easing
//             const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));

//             setter(currentValue);

//             if (progress < 1) {
//                 requestAnimationFrame(updateCount); // Continue animation until progress is 100%
//             }
//         };

//         requestAnimationFrame(updateCount);
//     };

//     // Use IntersectionObserver to trigger the count-up when the section is in view
//     useEffect(() => {
//         const handleScroll = () => {
//             if (sectionRef.current) {
//                 const rect = sectionRef.current.getBoundingClientRect();
//                 const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

//                 if (isInView) {
//                     animateCount(57, setProjectCount);
//                     animateCount(499, setManagerCount);
//                     animateCount(899, setToolsCount);
//                     animateCount(654, setProductCount);
//                 }
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     return (
//         <Fragment>
//             <section className="live-Data" ref={sectionRef}>
//                 <div>
//                     <div>
//                         <h2>Our Accomplishments</h2>
//                         <h1>Experience To Be Trusted</h1>
//                     </div>

//                     <section>
//                         <div>
//                             <span className="animate">{projectCount}</span>
//                             <span><Add /></span>
//                             <h3>Project</h3>
//                         </div>

//                         <div>
//                             <span className="animate">{managerCount}</span>
//                             <span><Add /></span>
//                             <h3>Project Managers</h3>
//                         </div>

//                         <div>
//                             <span className="animate">{toolsCount}</span>
//                             <span><Add /></span>
//                             <h3>Development Tools</h3>
//                         </div>

//                         <div>
//                             <span className="animate">{productCount}</span>
//                             <span><Add /></span>
//                             <h3>Innovative Products</h3>
//                         </div>
//                     </section>
//                 </div>
//             </section>

//             {/* section section */}
//             <section className="bulk-data">
//                 <div>
//                     {/* right */}
//                     <div>
//                         <h2>Cement Booking in bulk</h2>
//                         <div>
//                             <p>
//                                 Establishing an online cement dealership that proudly features an array of premium brands demands meticulous planning,
//                                 strategic brand alliances, and impactful marketing approaches. Below is a comprehensive step-by-step manual on initiating
//                                 and overseeing an online cement dealership under our esteemed brand, ensuring excellence and diversity in our product offerings.
//                             </p>
//                         </div>
//                     </div>

//                     {/* left card */}
//                     <div>
//                         <h2>Cement Booking in bulk</h2>
//                         <div>
//                             <p>
//                                 Establishing an online cement dealership that proudly features an array of premium brands demands meticulous planning,
//                                 strategic brand alliances, and impactful marketing approaches. Below is a comprehensive step-by-step manual on initiating
//                                 and overseeing an online cement dealership under our esteemed brand, ensuring excellence and diversity in our product offerings.
//                             </p>
//                         </div>
//                     </div>

//                 </div>
//             </section>
//         </Fragment>
//     );
// };

// export default LiveCount;
