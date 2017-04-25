from django.db import models

class DocumentManager(models.Manager):
    def separate_google_and_uploaded_docs(self, documents_list):
        google_documents = []
        uploaded_documents = []
        for document in documents_list:
            if document.uploaded_file == '':
                google_documents.append(document)
            else:
                uploaded_documents.append(document)

        return google_documents, uploaded_documents

    def build_documents_data(self, google_documents, uploaded_documents):
        documents_data = {'google_documents': [], 'uploaded_documents': []}

        for document in google_documents:
            documents_data['google_documents'].append([document.title, str(document.document_uuid), document.view_link])

        for document in uploaded_documents:
            documents_data['uploaded_documents'].append([document.title, str(document.document_uuid)])

        return documents_data
