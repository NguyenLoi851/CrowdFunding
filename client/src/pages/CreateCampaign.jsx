import React from 'react'

const Input = ({placeholder, type, minimumContribution})=>(
  <input 
    placeholder={placeholder}
    type = {type}
    // value = {minimumContribution}
    className="outline"
  />
);

const CreateCampaign = () => {
  console.log(document.getElementsByTagName("input"))
  return (
    <div>
      <div>
        Create a new campaign:
      </div>
      <div>
          Minimum Contribution
          <Input type="text" name="contribution" placeholder="Contribution (wei)"/>
      </div>
    </div>
  )
}

export default CreateCampaign