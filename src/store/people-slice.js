import { createSlice } from "@reduxjs/toolkit";
import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { storage } from "../firebase";
import { getDownloadURL, ref as sRef } from "firebase/storage";
const peopleSlice = createSlice({
    name: "people",
    initialState: [],
    reducers: {
        addPerson(state, action) {
            state = state.filter((value) => {
                return value.uid !== action.payload.uid;
            });
            return [...state, action.payload];
        },
        removePerson(state, action) {
            state = state.filter((value) => {
                return value.uid !== action.payload;
            });
            return state;
        },
    },
});
export const peopleSliceActions = peopleSlice.actions;

export const fetchPeople = () => {
    return async (dispatch, getState) => {
        const userConfig = getState().config;
        const [firstAge, secondAge] = userConfig.ageRange.value.split("-");
        get(ref(database, `/`)).then((snapshot) => {
            const response = snapshot.val();
            for (const id in response) {
                if (response[id].config) {
                    const responseConfig = response[id].config;
                    if (
                        responseConfig.age.value >= Number(firstAge) &&
                        responseConfig.age.value <= Number(secondAge)
                    ) {
                        if (
                            userConfig.prefferedPartner.id == responseConfig.sex
                        ) {
                            const identificators = [userConfig.uid];

                            get(ref(database, `${userConfig.uid}/liked`))
                                .then((snapshot) => {
                                    for (const id in snapshot.val()) {
                                        identificators.push(id);
                                    }
                                })
                                .then(() => {
                                    get(
                                        ref(
                                            database,
                                            `${userConfig.uid}/banned`
                                        )
                                    ).then((snapshot) => {
                                        for (const id in snapshot.val()) {
                                            identificators.push(id);
                                        }
                                    });
                                })
                                .then(() => {
                                    getDownloadURL(
                                        sRef(storage, `${id}/pictures`)
                                    )
                                        .then((url) => {
                                            response[id].config.img = url;
                                        })
                                        .then(() => {
                                            if (!identificators.includes(id)) {
                                                dispatch(
                                                    peopleSliceActions.addPerson(
                                                        response[id].config
                                                    )
                                                );
                                            }
                                        });
                                });
                        }
                    }
                }
            }
        });
    };
};

export default peopleSlice;
