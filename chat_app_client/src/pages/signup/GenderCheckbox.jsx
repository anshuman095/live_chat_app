import { ErrorMessage, Field } from "formik";

const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <Field
            type="radio"
            name="gender"
            value="male"
            className="radio border-slate-900"
          />
          <ErrorMessage
            className="text-red-700"
            name="gender"
            component="div"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <Field
            type="radio"
            name="gender"
            value="female"
            className="radio border-slate-900"
          />
          <ErrorMessage
            className="text-red-700"
            name="gender"
            component="div"
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
