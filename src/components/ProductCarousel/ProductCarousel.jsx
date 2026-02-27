import { useState } from 'react';
import styles from './ProductCarousel.module.css';

import shockDevice from '../../assets/images/shock_device.png';
import andoscopy from '../../assets/images/andoscopy.png';
import cheshm from '../../assets/images/cheshm.png';
import implant from '../../assets/images/implant.webp';
import watch from '../../assets/images/watch.png';

import { TbHeartbeat } from "react-icons/tb";
import { FaDisplay } from "react-icons/fa6";
import { SlEye } from "react-icons/sl";
import { TbRazor } from "react-icons/tb";
import { MdOutlineWatch } from "react-icons/md";

const products = [
    {
        title: 'قلب و عروق',
        name: 'Defibrillator / Monitor',
        model: '5DM RELIVE',
        image: shockDevice,
        icon: <TbHeartbeat />
    },
    {
        title: 'اندوسکوپی',
        name: 'Endoscopy / Laparoscopy',
        model: 'ENDOSET SYSTEMS',
        image: andoscopy,
        icon: <FaDisplay />
    },
    {
        title: 'چشم پزشکی',
        name: 'Ophthalmic Specialized Equipment',
        model: 'Slit Lamp | YAG Laser',
        image: cheshm,
        icon: <SlEye />
    },
    {
        title: 'ارتوپدی',
        name: 'Arthroplasty',
        model: 'TOTAL KNEE KneeTA®',
        image: implant,
        icon: <TbRazor />
    },
    {
        title: 'سلامت هوشمند',
        name: 'HealthGuard Intelliwatch S1',
        model: 'Galaxy watch5',
        image: watch,
        icon: <MdOutlineWatch />
    },
]

const ProductCarousel = () => {
    const [current, setCurrent] = useState(0);

    return (
        <div className={styles.main}>
            <h3>محصولات | Products</h3>
            <p>تنوع محصولات در صنـعت تـجهیزات پـزشکی صاایـران</p>
            <div className={styles.buttons}>
                {products.map((product, index)=>
                    <div key={index+'button'} onClick={()=>setCurrent(index)} className={current==index?styles.activeBtn:''}>
                        {product.title} {product.icon} 
                    </div>
                )}
            </div>
            <div className={styles.products}>
                {products.map((product,index)=>
                    <div key={index+'product'} className={`${styles.product} ${current==index?styles.activeProduct:''}`}>
                        <h3>{product.name}</h3>
                        <p>{product.model}</p>
                        <a href='#'>معرفی محصولات</a>
                        <img src={product.image} alt={product.model} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;