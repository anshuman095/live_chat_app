import "./style.css";

const GenderCheckbox = () => {
  return (
    <div className="gender-container">
      <div>
        <label>
          <span>Male</span>
          <input type="checkbox" />
        </label>
      </div>
      <div>
        <label>
          <span>Female</span>
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
