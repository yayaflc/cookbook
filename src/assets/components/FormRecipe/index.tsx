import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Select, Upload, TimePicker } from 'antd';
import Button from '../Button';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';

interface FormRecipeProps {
  onSubmit: (values: any) => void;
}

const { TextArea } = Input;
const { Option } = Select;

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
  steps: Yup.string().required("Passo a passo é obrigatório").min(1, "Adicione pelo menos 1 passo"),
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
      steps: '',
      category: [],
      image: null,
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
       onSubmit(values);
    }}
  >
    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
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
          {values.ingredients.map((ingredient, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Input
                placeholder="Nome"
                name={`ingredients[${idx}].name`}
                value={ingredient.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Quantidade"
                name={`ingredients[${idx}].quantity`}
                value={ingredient.quantity}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button
            className="w-full"
            label="Adicionar Ingrediente"
            icon={<PlusOutlined />}
            onClick={() => setFieldValue('ingredients', [...values.ingredients, { name: '', quantity: '' }])}
          />
        </Form.Item>
        <Form.Item
          label="Etapas"
          validateStatus={touched.steps && errors.steps ? 'error' : ''}
          help={touched.steps && errors.steps}
        >
          <TextArea name="steps" value={values.steps} onChange={handleChange} />
          <Button
            className="w-full mt-2"
            label="Adicionar Etapa"
            icon={<PlusOutlined />}
            onClick={() => setFieldValue('steps', values.steps + '\n')}
          />
        </Form.Item>
        <Form.Item
          label="Imagem"
          validateStatus={touched.image && errors.image ? 'error' : ''}
          help={touched.image && errors.image}
        >
          <Upload
            beforeUpload={file => {
              setFieldValue('image', file);
              return false;
            }}
            showUploadList={false}
          >
          </Upload>
        </Form.Item>
      </Form>
    )}
  </Formik>
    );
  };

export default FormRecipe;