import React, { useState, useEffect, ChangeEvent } from 'react';
import Usuario from '../../models/Usuario';
import { cadastroUsuario } from '../../service/Service';
import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let history = useNavigate();

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha === user.senha && user.senha.length >= 8) {

            try {
                await cadastroUsuario(`/usuario/cadastrar`, user, setUserResult)
                toast.success('Usuário cadastrado com sucesso', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined
                });

            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error('Erro ao cadastrar usuário', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined
                  });
            }

        } else {
            toast.info('Insira no mínimo 8 caracters na senha', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined
            });

            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='page-login'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6}>
                <Box paddingX={10}>
                    <form onSubmit={cadastrar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto-cadastro'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' name='nome' margin='normal' fullWidth />
                        <TextField value={user.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='email' label='email' variant='outlined' name='email' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarsenha' label='confirmar senha' variant='outlined' name='confirmarsenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='decoracao-link'>
                                <Button variant='contained' color='primary' className='btn-cancelar' >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='success'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;