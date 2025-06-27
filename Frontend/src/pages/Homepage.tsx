import JobForm from "@/components/app/jobForm";
import { useState } from "react"

const Home = ()=>{
    const [ showForm, setShowform] = useState(false);
    return(
        <div>
            <button onClick={()=>{
                setShowform(true)
            }}>Add JOB </button>

            {showForm&& (
                <div className="modal">
                    <div className="modal-content">
                       
                            <JobForm/>
                    
                    </div>

                </div>
            )}
        </div>
    )
}
export default Home