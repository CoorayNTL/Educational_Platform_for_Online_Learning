import React, {useContext, useReducer, useEffect} from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courses_reducer";
import course from "../utils/data";

const initialState = {
    course: [],
    single_course: {},
    categories: [],
}

const CoursesContext = React.createContext();

export const CoursesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCourse = () => {
        dispatch({type: GET_COURSES, payload: course})
    }

    const fetchSingleCourse = (id) => {
        const singleCourse = course.find(course => course.id === id);
        dispatch({type: GET_SINGLE_COURSE, payload: singleCourse})
    }

    const fetchCategories = () => {
        const categories = [...new Set(course.map(item => item.category))];
        dispatch({type: GET_CATEGORIES, payload: categories});
    }

    useEffect(() => {
        fetchCourse();
        fetchCategories();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            ...state,
            fetchSingleCourse
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCoursesContext = () => {
    return useContext(CoursesContext);
}