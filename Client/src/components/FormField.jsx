import React from 'react'

function FormField({labelName, type, name, placeholder, value, handleChange}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name}
        className="block text-sm font-medium text-grey-900">
            {labelName}
        </label>
      </div>
      <input type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required 
        className="bg-grey-50 border border-grey-300 border text-grey-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"/>
    </div>
  )
}

export default FormField
