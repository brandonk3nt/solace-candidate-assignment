import { Advocate } from "../types";

type AdvocateTableRowProps = {
  advocate: Advocate;
};

export default function AdvocateTableRow({ advocate }: AdvocateTableRowProps) {
  return (
    <tr>
      <td>{advocate.firstName}</td>
      <td>{advocate.lastName}</td>
      <td>{advocate.city}</td>
      <td>{advocate.degree}</td>
      <td>
        {advocate.specialties.map((specialty, i) => (
          <div key={i}>{specialty}</div>
        ))}
      </td>
      <td>{advocate.yearsOfExperience}</td>
      <td>{advocate.phoneNumber}</td>
    </tr>
  );
}
