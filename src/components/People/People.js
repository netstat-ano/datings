import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../store/people-slice";
import Person from "../Person/Person";
const People = (props) => {
    const dispatch = useDispatch();
    const people = useSelector((state) => state.people);
    useEffect(() => {
        dispatch(fetchPeople());
    }, []);
    return (
        <div>
            {people.map((person) => (
                <Person person={person}></Person>
            ))}
        </div>
    );
};
export default People;
