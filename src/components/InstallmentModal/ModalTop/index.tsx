import React from 'react'
import './_style.scss'
export default function ModalTop() {
    return (
        <div className='modal_top_wrapper'>
            <div className="modal_top_flex_box">
                <div className="modal_left_block">
                    <img src="/assets/img/mi.png" alt="" />
                    <div className="modal_name_box">
                        <p className='modal_good_title p18_regular'>MacBook Pro 13 MXK32ZP/A Space Gray</p>
                        <p className='modal_good_price title18_bold'>16 559 000 cум</p>
                    </div>
                </div>
                <div className="modal_option_block">
                    {/* <ModalCounter /> */}
                    <img src="/assets/icons/favorite.svg" alt="outlined_heart" />
                    <img className='delete_icon' src="/assets/icons/delete.svg" alt="outlined_heart" />
                </div>
            </div>
        </div>
    )
}
