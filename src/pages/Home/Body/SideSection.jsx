/*import React from 'react'
import { Link } from 'react-router-dom'

import LinkButton from '../../../components/main/LinkButton'
import Input from '../../../components/main/Input'
import { useConfig } from 'context/configContext'

export default function SideSection() {

    const { configs } = useConfig()

    return (
        <section className='content'>
            <div className="flexbox">
                <div className="leftside">
                    <div className="card">
                        <div className="text">
                            <h5 className="text-title">
                                {configs.HOME_TITLE}
                            </h5>
                            <div className="text-about">
                                <p>{configs.HOME_ABOUT}</p>
                            </div>
                            <span>
                                <Link to={'/news/'} className="button">Link Button</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="rightside">
                    <div className="form_wrapper">
                        <div className="form_container">
                            <form>
                                <div className="row clearfix">
                                    <div className="col_half">
                                        <div className="input_field">
                                            <Input />
                                        </div>
                                    </div>
                                    <div className="col_half">
                                        <div className="input_field">
                                            <Input />
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col_half">
                                        <div className="input_field">
                                            <Input />
                                        </div>
                                    </div>
                                    <div className="col_half">
                                        <div className="input_field">
                                            <Input />
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div>
                                        <div className="textarea_field">
                                            <textarea cols="46" rows="3" name="comments"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <input className="button" type="submit" value="Sumbit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}*/
