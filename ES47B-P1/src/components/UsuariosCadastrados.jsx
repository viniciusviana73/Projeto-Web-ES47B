import React from 'react';
import Spinner from './Spinner';

const UsuariosCadastrados = ({ users, loading, searchUser, setSearchUser }) => {
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className="p-4 bg-neutral-800 rounded-lg">
            <h3 className="text-white text-lg mb-4">Usuários Cadastrados</h3>
            <input
                type="text"
                placeholder="Pesquisar por e-mail..."
                className="mb-4 p-2 rounded bg-neutral-700 text-white"
                onChange={(e) => setSearchUser(e.target.value)}
            />
            {loading.users ? <Spinner /> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-white">
                        <thead>
                            <tr>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id} className="hover:bg-neutral-700">
                                    <td className="p-2 text-left">{user.email}</td>
                                    <td className="p-2 text-left">{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsuariosCadastrados;