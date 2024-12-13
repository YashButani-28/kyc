import ActionButton from "../formComponents/ActionButton";
import { useNavigate } from "react-router-dom";

export default function ButtonGroup({
  ResetButton,
  onSave,
  onSaveAndNext,
  onSubmit,
  previousPath = "layout",
  noPreviousButton,
  submitButton,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-evenly w-auto gap-4">
      {!noPreviousButton && (
        <ActionButton
          type="submit"
          variant="lightGray"
          onClick={() => navigate(`/layout/${previousPath}`)}
        >
          Previous
        </ActionButton>
      )}

      <ActionButton type="submit" variant="gray" onClick={onSave}>
        Save
      </ActionButton>
      <ActionButton
        type="reset"
        variant="darkGray"
        onClick={() => ResetButton()}
      >
        Reset
      </ActionButton>

      {submitButton ? (
        <ActionButton type="submit" variant="black" onClick={onSubmit}>
          Submit
        </ActionButton>
      ) : (
        <ActionButton type="submit" variant="primary" onClick={onSaveAndNext}>
          Save & Next
        </ActionButton>
      )}
    </div>
  );
}
