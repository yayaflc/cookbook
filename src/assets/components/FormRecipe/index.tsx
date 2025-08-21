import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Select, Upload, TimePicker } from 'antd';
import Button from '../Button';
import { FaImage } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import moment from 'moment';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;


interface FormRecipeProps {
    onSubmit: (values: any) => void;
}

const validationSchema = Yup.object({
    title: Yup.string().required("Título é obrigatório"),
    description: Yup.string().required("Descrição é obrigatória"),
    ingredients: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Nome do ingrediente é obrigatório"),
            quantity: Yup.string().required("Quantidade é obrigatória"),
        })
    ).min(1, "Adicione pelo menos 1 ingrediente"),
    preparationTime: Yup.string().required("Informe o tempo de preparo"),
    steps: Yup.array().of(Yup.string().required("Etapa é obrigatório")).min(1, "Adicione pelo menos 1 etapa"),
    categorias: Yup.array().of(Yup.string()).min(1, "Selecione pelo menos 1 categoria"),
    image: Yup.mixed().required("Adicione uma foto"),
});

const FormRecipe = ({
    onSubmit }: FormRecipeProps) => {

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                ingredients: [{ name: '', quantity: '' }],
                preparationTime: '',
                steps: [''],
                category: [],
                image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
                const removeIngredient = (idx: number) => {
                    setFieldValue(
                        'ingredients',
                        values.ingredients.filter((_, i) => i !== idx)
                    );
                };

                return (
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Título"
                            validateStatus={touched.title && errors.title ? 'error' : ''}
                            help={touched.title && errors.title}
                        >
                            <Input name="title" value={values.title} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Descrição"
                            validateStatus={touched.description && errors.description ? 'error' : ''}
                            help={touched.description && errors.description}
                        >
                            <TextArea name="description" value={values.description} onChange={handleChange} />
                        </Form.Item>
                        <div className="flex justify-between gap-2">
                            <Form.Item
                                className="flex-1"
                                label="Tempo de Preparo"
                                validateStatus={touched.preparationTime && errors.preparationTime ? 'error' : ''}
                                help={touched.preparationTime && errors.preparationTime}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    value={values.preparationTime ? moment(values.preparationTime, "HH:mm") : null}
                                    onChange={(_, timeString) => setFieldValue('preparationTime', timeString)}
                                    minuteStep={1}
                                    showNow={false}
                                    placeholder='Selecione o tempo'
                                    className="!flex"
                                />
                            </Form.Item>
                            <Form.Item
                                className="flex-1"
                                label="Categorias"
                                validateStatus={touched.category && errors.category ? 'error' : ''}
                                help={touched.category && errors.category}

                            >
                                <Select
                                    mode="tags"
                                    value={values.category}
                                    onChange={value => setFieldValue('category', value)}
                                    maxTagCount={2}
                                    placeholder="Adicione categorias"
                                >
                                    <Option value="doce">Doce</Option>
                                    <Option value="salgado">Salgado</Option>
                                    <Option value="vegetariano">Vegetariano</Option>
                                    <Option value="vegano">Vegano</Option>
                                    <Option value="gluten-free">Gluten-Free</Option>
                                    <Option value="low-carb">Low-Carb</Option>
                                    <Option value="rápido">Agridoce</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Ingredientes"
                        >
                            <div className="max-h-28 overflow-y-auto overflow-x-hidden gap-1 mb-2">
                                {values.ingredients.map((ingredient, idx) => (
                                    <div key={idx} className="relative flex gap-2 mb-2 items-center">
                                        <Input
                                            placeholder="Nome"
                                            name={`ingredients[${idx}].name`}
                                            value={ingredient.name}
                                            onChange={handleChange}
                                            className="pr-7"
                                        />
                                        <Input
                                            placeholder="Quantidade"
                                            name={`ingredients[${idx}].quantity`}
                                            value={ingredient.quantity}
                                            onChange={handleChange}
                                            className="pr-7"
                                        />
                                        {idx > 0 && (
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-red-500 transition"
                                                onClick={() => removeIngredient(idx)}
                                                title="Remover ingrediente"
                                            >
                                                <span className="text-lg font-bold">&times;</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="w-full"
                                label="Adicionar Ingrediente"
                                icon={<FiPlus  />}
                                onClick={() => setFieldValue('ingredients', [...values.ingredients, { name: '', quantity: '' }])}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Etapas"
                            validateStatus={touched.steps && errors.steps ? 'error' : ''}
                            help={touched.steps && errors.steps}
                        >
                            <div className="max-h-28 overflow-y-auto overflow-x-hidden gap-1 mb-2">
                                {Array.isArray(values.steps) &&
                                    values.steps.map((step, idx) => (
                                        <div key={idx} className="relative flex gap-2 mb-2 items-center">
                                            <TextArea
                                                placeholder={`Descreva etapa ${idx + 1}`}
                                                name={`steps[${idx}]`}
                                                value={step}
                                                onChange={handleChange}
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
                                            {idx > 0 && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-red-500 transition"
                                                    onClick={() =>
                                                        setFieldValue(
                                                            'steps',
                                                            values.steps.filter((_, i) => i !== idx)
                                                        )
                                                    }
                                                    title="Remover etapa"
                                                    style={{ zIndex: 1 }}
                                                >
                                                    <span className="text-lg font-bold">&times;</span>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </div>
                            <Button
                                className="w-full mt-2"
                                label="Adicionar Etapa"
                                icon={<FiPlus  />}
                                onClick={() => setFieldValue('steps', [...values.steps, ''])}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Imagem"
                            validateStatus={touched.image && errors.image ? 'error' : ''}
                            help={touched.image && errors.image}
                        >
                            <Dragger
                                beforeUpload={file => {
                                    setFieldValue('image', file);
                                    return false;
                                }}
                                showUploadList={false}
                                multiple={false}
                                accept="image/*"
                            >
                                <p className="ant-upload-drag-icon flex justify-center items-center">
                                    <FaImage className="text-stone-600 text-4xl" />
                                </p>
                                <p className="ant-upload-text">Arraste uma imagem ou clique para selecionar</p>
                                <p className="ant-upload-hint">Apenas imagens são permitidas</p>
                            </Dragger>
                        </Form.Item>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormRecipe;