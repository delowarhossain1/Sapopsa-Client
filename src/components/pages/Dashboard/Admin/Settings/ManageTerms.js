import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import css from "../../../../../css/settings.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { AiFillCloseSquare } from 'react-icons/ai';
import Loading from '../../../../shared/Loading/Loading';
import useModal from '../../../../../hooks/useModal';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { MdPublish } from 'react-icons/md';

const ManageTerms = ({ info = {} }) => {
    const {termsAndCondition, refetch} = info;
    const { simpleAlertWithConfirmBtn, successFullModal } = useModal();
    const [updating, setUpdating] = useState(false);
    const [user, userLoading] = useAuthState(auth);
    const [terms, setTerms] = useState([]);

    useEffect(() => setTerms(termsAndCondition), []);

    // Handle terms
    const handleTerms = (event) => {
        event.preventDefault();
        const term = event.target.terms;
        const termText = term.value;

        if(termText){
            setTerms([...terms, termText]);
        }

        // Clear the text;
        term.value = '';
    }

    // delete terms
    const deleteTerm = (index) => {
        const rest = terms.filter((item, i) => index !== i);
        setTerms(rest);
    }

    // Update terms and conditions on database;
    const updateTerms = () => {
        // update loading status;
        setUpdating(true);

        const alertInfo = {
            text: 'Do you want publish the terms and condition?',
            confirmBtn: "Yes. I want!"
        }

        simpleAlertWithConfirmBtn(alertInfo, () => {
            fetch(`/api/settings/termsAndCondition?email=${user?.email}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({termsAndCondition : terms})
            })
                .then(res => res.json())
                .then(res => {
                    // update loading status;
                    setUpdating(false);
                    // Refetch
                    refetch();

                    if (res?.modifiedCount > 0) {
                        successFullModal('Published successfully.');
                    }
                })
        });
    }

    // Loading status 
    if (userLoading || updating) <Loading />


    return (
        <div>
            <PageTitle title='Manage terms & conditions' />
            <DashboardTitle title='Terms & Conditions' />

            <div className={css.UpdateBtnContainer}>
                <button type="button" onClick={updateTerms}>Publish <MdPublish /></button>
            </div>

            <form className={css.termsForm} onSubmit={handleTerms}>
                <textarea name='terms' placeholder='Terms & Conditions / Pricacy Policy' autoFocus required></textarea>
                <button>Add New</button>
            </form>


            <div className={css.termsList}>
                <ul>
                    {
                        terms?.map((term, index) => (
                            <li key={index * Math.random()}>
                                <AiFillCloseSquare onClick={() => deleteTerm(index)}/>
                                <span>{term}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default ManageTerms;