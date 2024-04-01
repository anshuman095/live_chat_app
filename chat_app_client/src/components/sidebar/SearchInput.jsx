import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const SearchInput = () => {
  const selectedUserData = useSelector((state) => state?.auth?.selectedUser);
  const allUsers = useSelector((state) => state?.auth?.allUserDetails);

  return (
    <Formik
      initialValues={{
        search: "",
      }}
      validate={() => {
        const errors = {};
        return errors;
      }}
      onSubmit={async (values) => {
        if (!values.search) {
          return;
        }
        if (values.search < 3) {
          toast.error("Search term must be at least 3 characters long");
        }
        const conversation = allUsers.find((c) =>
          c.fullName.toLowerCase().includes(values.search.toLowerCase())
        );
      }}
    >
      {() => (
        <Form className="flex items-center gap-2">
          <Field
            type="text"
            placeholder="Search…"
            className="input input-bordered rounded-full"
            name="search"
          />
          <button
            type="submit"
            className="btn btn-circle bg-sky-500 text-white"
          >
            <IoSearchSharp className="w-6 h-6 outline-none" />
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default SearchInput;
