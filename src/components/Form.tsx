import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  client: Client;
  onSubmit?: (client: Client) => void;
  cancelled?: () => void;
}

export default function Form(props: FormProps) {
  const id = props.client?.id;
  const [name, setName] = useState(props.client?.name ?? "");
  const [age, setAge] = useState(props.client?.age ?? 0);
  return (
    <div>
      {id ? <Input readonly text="Code" value={id} className="mb-5" /> : false}
      <Input text="Name" value={name} onChange={setName} className="mb-5" />
      <Input text="Age" type="number" value={age} onChange={setAge} />

      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={() => props.onSubmit?.(new Client(name, +age, id))}
        >
          {id ? "Edit" : "Save"}
        </Button>
        <Button onClick={props.cancelled}>Cancel</Button>
      </div>
    </div>
  );
}
