import {useForm} from 'react-hook-form';
import {useState} from 'react';
import Response from './Response';

interface FormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
  missingContact: string;
  nonExistentEmail: string;
}

export type ResType = 'Neexistující email' | 'Formulář úspěšně odeslán';

function App() {
  const [response, setResponse] = useState<ResType | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const submitHandler = ({email, phone}: FormFields) => {
    if (email === '' && phone === '') {
      setError('missingContact', {type: 'custom', message: 'Email nebo telefon nesmí být prázdný'});
      return;
    }

    const resMessage: ResType = email === 'neexistujici@email.cz' ? 'Neexistující email' : 'Formulář úspěšně odeslán';
    setTimeout(() => {
      setResponse(resMessage);
    }, 3000);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-500'>
      <div>
        <h1 className='md:text-5xl sm:text-4xl text-3xl font-extrabold text-white text-center py-16 px-10'>Kontaktní formulář</h1>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col items-center gap-6 bg-slate-600 rounded-xl sm:p-16 p-10'>
          <input {...register('name')} type='text' placeholder='Jméno' id='name' name='name' className='p-2 rounded-lg' />
          {errors.email && <strong className='bg-rose-500 text-white rounded-lg p-2'>{errors.email?.message}</strong>}
          {/*RegEx src: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email*/}
          <input
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: 'Nesprávný formát',
              },
            })}
            onChange={() => clearErrors(['missingContact', 'nonExistentEmail'])}
            type='email'
            placeholder='Email'
            id='email'
            name='email'
            className='p-2 rounded-lg'
          />
          {errors.phone && <strong className='bg-rose-500 text-white rounded-lg p-2'>{errors.phone?.message}</strong>}
          {/*RegEx src: https://www.regularnivyrazy.info/telefonni-cislo.html*/}
          <input
            {...register('phone', {pattern: {value: /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/, message: 'Nesprávný formát'}})}
            onChange={() => clearErrors(['missingContact'])}
            type='text'
            placeholder='Telefon'
            id='phone'
            name='phone'
            className='p-2 rounded-lg'
          />
          <textarea
            {...register('message', {required: 'Pole Zpráva je povinné'})}
            id='message'
            name='message'
            placeholder='Zpráva'
            rows={10}
            className='w-3/4 resize-none rounded-lg p-2'
          ></textarea>
          {errors.message && <strong className='bg-rose-500 text-white rounded-lg p-2'>{errors.message?.message}</strong>}
          {errors.missingContact && <strong className='bg-rose-500 text-white rounded-lg p-2'>{errors.missingContact?.message}</strong>}
          <input
            type='submit'
            value='Odeslat'
            className='text-white font-bold bg-blue-400 transition ease-in-out duration-300 hover:bg-blue-500 cursor-pointer p-3 rounded-lg'
          />
        </form>
        {response && <Response res={response} />}
      </div>
    </div>
  );
}

export default App;

