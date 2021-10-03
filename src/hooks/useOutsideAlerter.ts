import * as React from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref:any, mustTrigger: boolean, openingTrigger: any) {

    const [clickedOutside, setClickedOutside] = React.useState<boolean>(false);

    React.useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:any) {
            console.log("THIS");
            
            if (mustTrigger) {
                console.log("MIST");
                
                if (ref.current && !ref.current.contains(event.target) && !openingTrigger.current.contains(event.target)) {                     
                    setClickedOutside(true);
                } else {
                    setClickedOutside(false);
                }
            } else {
                setClickedOutside(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [ref, mustTrigger, openingTrigger]);

    return { clickedOutside }
}