import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "../../Assets/Icons";
import ProfileBanner from "../../Common/ProfileBanner";

const MyProfile = () => {

    const userDetails = useSelector((state) => state.userDetails);

    return (
        <>


            <section className="category-page">

                <ProfileBanner />

                <div className="edit-form">
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        return;
                    }}>

                        <div className="full-sized-input">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name={"name"}
                                // value={}
                                defaultValue={userDetails?.name}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="full-sized-input">
                            <label htmlFor="name">Email</label>
                            <input
                                type="text"
                                id="name"
                                name={"name"}
                                // value={}
                                defaultValue={userDetails?.email}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="full-sized-input">
                            <label htmlFor="name">Phone</label>
                            <input
                                type="number"
                                id="name"
                                name={"name"}
                                // value={}
                                className="form-input"
                                required
                            />
                        </div>


                    </form>

                </div>
                
            </section>
        </>
    );
};

export default MyProfile;