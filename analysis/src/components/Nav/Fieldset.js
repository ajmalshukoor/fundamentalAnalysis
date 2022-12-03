import React from  "react";
import {Link} from "react-router-dom"

export default function Fieldset(props){
    
    //Just a big form
    return(
        <fieldset>
        <legend>Understand the business</legend>
        <div>
        <div className="question">
        <label htmlFor="sectorvalue">{props.formData.sector}</label>
        <input 
            type="checkbox"
            id="sectorvalue"
            name="sectorvalue"
            onChange={props.handleChange}
            value={props.formData.sectorvalue}
            defaultChecked={props.formData.sectorvalue}
        />
        <textarea id="sectorComments" name="sectorComments"  onChange={props.handleChange} value={props.formData.sectorComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="companyvalue">{props.formData.company}</label>
        <input 
            type="checkbox"
            id="companyvalue"
            name="companyvalue"
            onChange={props.handleChange}
            value={props.formData.companyvalue}
            defaultChecked={props.formData.companyvalue}
        />
        <textarea id="companyComments" name="companyComments"  onChange={props.handleChange} value={props.formData.companyComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.model}</label>
        <input 
            type="checkbox"
            id="modelvalue"
            name="modelvalue"
            onChange={props.handleChange}
            value={props.formData.modelvalue}
            defaultChecked={props.formData.modelvalue}
        />
        <textarea id="modelComments" name="modelComments"  onChange={props.handleChange} value={props.formData.modelComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="popularityvalue">{props.formData.popularity}</label>
        <input 
            type="checkbox"
            id="popularityvalue"
            name="popularityvalue"
            onChange={props.handleChange}
            value={props.formData.popularityvalue}
            defaultChecked={props.formData.popularityvalue}
        />
        <textarea id="popularityComments" name="popularityComments"  onChange={props.handleChange} value={props.formData.popularityComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.competitors}</label>
        <input 
            type="checkbox"
            id="competitorsvalue"
            name="competitorsvalue"
            onChange={props.handleChange}
            value={props.formData.competitorsvalue}
            defaultChecked={props.formData.competitorsvalue}
        />
        <textarea id="competitorsComments" name="competitorsComments"  onChange={props.handleChange} value={props.formData.competitorsComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.review}</label>
        <input 
            type="checkbox"
            id="reviewvalue"
            name="reviewvalue"
            onChange={props.handleChange}
            value={props.formData.reviewvalue}
            defaultChecked={props.formData.reviewvalue}
        />
        <textarea id="reviewComments" name="reviewComments"  onChange={props.handleChange} value={props.formData.reviewComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.how}</label>
        <input 
            type="checkbox"
            id="howvalue"
            name="howvalue"
            onChange={props.handleChange}
            value={props.formData.howvalue}
            defaultChecked={props.formData.howvalue}
        />
        <textarea id="howComments" name="howComments"  onChange={props.handleChange} value={props.formData.howComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.location}</label>
        <input 
            type="checkbox"
            id="locationsvalue"
            name="locationsvalue"
            onChange={props.handleChange}
            value={props.formData.locationsvalue}
            defaultChecked={props.formData.locationsvalue}
        />
        <textarea id="locationsComments" name="locationsComments"  onChange={props.handleChange} value={props.formData.locationsComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.shareholders}</label>
        <input 
            type="checkbox"
            id="shareholdersvalue"
            name="shareholdersvalue"
            onChange={props.handleChange}
            value={props.formData.shareholdersvalue}
            defaultChecked={props.formData.shareholdersvalue}
        />
        <textarea id="shareholdersComments" name="shareholdersComments"  onChange={props.handleChange} value={props.formData.shareholdersComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.subsidiaries}</label>
        <input 
            type="checkbox"
            id="subsidiariesvalue"
            name="subsidiariesvalue"
            onChange={props.handleChange}
            value={props.formData.subsidiariesvalue}
            defaultChecked={props.formData.subsidiariesvalue}
        />
        <textarea id="subsidiariesComments" name="subsidiariesComments"  onChange={props.handleChange} value={props.formData.subsidiariesComments}/>
        <br/>
        </div>
        <div className="question">
        <label htmlFor="">{props.formData.risks}</label>
        <input 
            type="checkbox"
            id="risksvalue"
            name="risksvalue"
            onChange={props.handleChange}
            value={props.formData.risksvalue}
            defaultChecked={props.formData.risksvalue}
        />
        <textarea id="risksComments" name="risksComments"  onChange={props.handleChange} value={props.formData.risksComments}/>
        <br/>
        </div>
    </div>
    <button onClick={props.handleClick}>Clear Sheet</button>
    </fieldset>
    )
}