import { useRef, useState } from "react";

function Dummy() {

    function level1(){
        console.log("level 1")
    }
    function level2(){
        console.log("level 2")
    }
    function level3(){
        console.log("level 3")
    }

    return (
        <>
            <div className="border border-black min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px]" onClick={level1}>
                <div className="border border-black min-w-[50px] min-h-[50px] max-w-[100px] max-h-[100px]" onClick={level2}>
                    <div className="border border-black min-w-[25px] min-h-[25px] max-w-[100px] max-h-[100px]" onClick={level3}>

                    </div>
                </div>
            </div>
        </>
    )
}

  

export default Dummy;
