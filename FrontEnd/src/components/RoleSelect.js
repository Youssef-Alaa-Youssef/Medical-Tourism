import Form from 'react-bootstrap/Form';

function RoleSelect() {
    return (
        <Form.Select aria-label="Default select example">
            <option value="1">Patient</option>
            <option value="2">Treatment Center</option>
            <option value="3">Tourist</option>
        </Form.Select>
    );
}

export default RoleSelect;