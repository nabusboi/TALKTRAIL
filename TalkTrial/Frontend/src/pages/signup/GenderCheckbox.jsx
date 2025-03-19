import React from 'react';

const GenderCheckbox = ({ onChangeGender, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'male' ? 'selected' : ''
          }`}
        >
          <span className="label-text text-white">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-success border-slate-600"
            checked={selectedGender === 'male'}
            onChange={() => onChangeGender('male')}
          />
        </label>
      </div>
      <div>
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'female' ? 'selected' : ''
          }`}
        >
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-success border-slate-600"
            onChange={() => onChangeGender('female')}
            checked={selectedGender === 'female'}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
