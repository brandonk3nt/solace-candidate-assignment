import { Advocate } from "../types";
import AdvocateTableRow from "./AdvocateTableRow";

type AdvocateTableProps = {
  advocates: Advocate[];
};

const headerLabels = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Specialties",
  "Years of Experience",
  "Phone Number",
];

export default function AdvocateTable({ advocates }: AdvocateTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {headerLabels.map((header, i) => (
            <th key={i} className="pb-4">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate, i) => (
          <AdvocateTableRow key={i} advocate={advocate} />
        ))}
      </tbody>
    </table>
  );
}
