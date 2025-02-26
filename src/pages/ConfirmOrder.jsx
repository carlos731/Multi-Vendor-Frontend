import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
    return await loadStripe('pk_test_51Qvz23AwWZbJxm5S1lPJKSmSYJGPZy4gqiURDebtsaQU0BkqrBx9fqhxflSL9vvwKCneM6MibuiD92lEtphglK1v00sKcbFMCh')
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return;
        }
    
        // Obter o 'client_secret' da URL
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
        if (!clientSecret) {
            setMessage('failed'); // Não foi possível encontrar o client_secret
            return;
        }
    
        // Recuperar o PaymentIntent do Stripe
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent, error }) => {
            // Se houver erro, ou se o paymentIntent for indefinido, mostra uma mensagem de falha
            if (error || !paymentIntent) {
                console.error('Erro ao recuperar PaymentIntent:', error);
                setMessage('failed');
                return;
            }
    
            // Verifica o status do pagamento retornado
            switch (paymentIntent.status) {
                case "succeeded":
                    console.log('succeeded');
                    setMessage('succeeded');
                    break;
                case "processing":
                    console.log('processing');
                    setMessage('processing');
                    break;
                case "requires_payment_method":
                    setMessage('failed');
                    break;
                default:
                    setMessage('failed');
            }
        }).catch((error) => {
            // Caso ocorra erro durante a chamada ao Stripe
            console.error('Erro ao recuperar PaymentIntent:', error);
            setMessage('failed');
        });
    }, [stripe]);
    

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }

    useEffect(() => {
        get_load()
    }, [])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    }, [message])


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                    <img src={error} alt="" />
                    <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader /> : <>
                    <img src={success} alt="" />
                    <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : <FadeLoader />
            }

        </div>
    );
};

export default ConfirmOrder;